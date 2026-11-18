create extension if not exists "pgcrypto";
create table profiles (id uuid primary key references auth.users on delete cascade, full_name text, phone text, role text not null default 'customer' check (role in ('customer','admin')), created_at timestamptz default now());
create table categories (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null);
create table products (id uuid primary key default gen_random_uuid(), category_id uuid references categories, slug text unique not null, name text not null, description text, price int not null check (price>=0), occasion text, popularity int default 0, active boolean default true, created_at timestamptz default now());
create table product_images (id uuid primary key default gen_random_uuid(), product_id uuid references products on delete cascade, url text not null, alt text, sort int default 0);
create table product_variants (id uuid primary key default gen_random_uuid(), product_id uuid references products on delete cascade, label text not null, price_delta int default 0);
create table addons (id uuid primary key default gen_random_uuid(), name text not null, price int not null);
create table orders (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users, name text not null, phone text not null, address text not null, city text not null, delivery_date date, time_slot text, gift_message text, payment_method text not null check (payment_method in ('cod','bank_transfer','jazzcash','easypaisa')), payment_screenshot_path text, subtotal int not null, delivery_fee int not null default 0, total int not null, status text not null default 'pending' check (status in ('pending','confirmed','preparing','out_for_delivery','delivered','cancelled')), created_at timestamptz default now());
create table order_items (id uuid primary key default gen_random_uuid(), order_id uuid references orders on delete cascade, product_id uuid references products, name text not null, qty int not null, unit_price int not null);
create table snack_items (id uuid primary key default gen_random_uuid(), name text unique not null, price int not null, active boolean default true);
create table custom_basket_orders (id uuid primary key default gen_random_uuid(), order_id uuid references orders on delete cascade, size text, ribbon text, message text, items jsonb);
create table masehri_packages (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, description text, price int not null, occasion text);
create table masehri_inquiries (id uuid primary key default gen_random_uuid(), name text not null, phone text not null, city text not null, event_date date, venue text, budget int, notes text, created_at timestamptz default now());
create table reviews (id uuid primary key default gen_random_uuid(), product_id uuid references products on delete cascade, user_id uuid references auth.users, rating int check (rating between 1 and 5), body text, created_at timestamptz default now());
create table newsletter_subscribers (id uuid primary key default gen_random_uuid(), email text unique not null, created_at timestamptz default now());

create or replace function is_admin() returns boolean language sql security definer stable as $$ select exists (select 1 from profiles where id = auth.uid() and role='admin') $$;
create or replace function handle_new_user() returns trigger language plpgsql security definer as $$ begin insert into profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name'); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

do $$ declare t text; begin foreach t in array array['profiles','categories','products','product_images','product_variants','addons','orders','order_items','snack_items','custom_basket_orders','masehri_packages','masehri_inquiries','reviews','newsletter_subscribers'] loop
 execute format('alter table %I enable row level security', t);
 execute format('create policy "admin all" on %I for all using (is_admin()) with check (is_admin())', t); end loop; end $$;
-- Public catalogue read
do $$ declare t text; begin foreach t in array array['categories','products','product_images','product_variants','addons','snack_items','masehri_packages','reviews'] loop
 execute format('create policy "public read" on %I for select using (true)', t); end loop; end $$;
create policy "own profile" on profiles for select using (id = auth.uid());
create policy "own profile update" on profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = 'customer');
create policy "orders insert" on orders for insert with check (user_id is null or user_id = auth.uid());
create policy "orders own read" on orders for select using (user_id = auth.uid());
create policy "items own read" on order_items for select using (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "items insert" on order_items for insert with check (true);
create policy "inquiry insert" on masehri_inquiries for insert with check (true);
create policy "newsletter insert" on newsletter_subscribers for insert with check (true);
create policy "review insert" on reviews for insert with check (user_id = auth.uid());

insert into storage.buckets (id, name, public) values ('product-images','product-images',true),('payment-screenshots','payment-screenshots',false) on conflict do nothing;
create policy "public read product images" on storage.objects for select using (bucket_id='product-images');
create policy "admin write product images" on storage.objects for all using (bucket_id='product-images' and is_admin()) with check (bucket_id='product-images' and is_admin());
create policy "upload screenshots" on storage.objects for insert with check (bucket_id='payment-screenshots');
create policy "admin read screenshots" on storage.objects for select using (bucket_id='payment-screenshots' and is_admin());
