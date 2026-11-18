// Generates supabase/seed.sql from src/lib/data.ts (keeps one source of truth).
import fs from 'fs';
const src = fs.readFileSync('src/lib/data.ts', 'utf8');
const rows = [...src.matchAll(/\['([^']+(?:’[^']*)?)',(\d+),'([^']+)','([^']+)'\]/g)];
const cat = i => i < 6 ? 'bouquets' : i < 12 ? 'gift-sets' : i < 18 ? 'snack-baskets' : 'masehri';
const q = s => s.replace(/'/g, "''");
let sql = "insert into categories (slug,name) values ('bouquets','Bouquets'),('gift-sets','Gift Sets'),('snack-baskets','Custom Snack Baskets'),('masehri','Masehri Decoration') on conflict do nothing;\n";
rows.forEach((m, i) => { const [, n, p, o, d] = m; if (i < 18) sql += `insert into products (category_id,slug,name,description,price,occasion) select id,'${q(n.toLowerCase().replace(/[^a-z0-9]+/g,'-'))}','${q(n)}','${q(d)}',${p},'${q(o)}' from categories where slug='${cat(i)}' on conflict do nothing;\n`;
  else sql += `insert into masehri_packages (slug,name,description,price,occasion) values ('${q(n.toLowerCase().replace(/[^a-z0-9]+/g,'-'))}','${q(n)}','${q(d)}',${p},'${q(o)}') on conflict do nothing;\n`; });
sql += "insert into snack_items (name,price) values ('Chocolates',350),('Chips',150),('Biscuits',200),('Dry Fruits',600),('Juice Box',120),('Popcorn',250) on conflict do nothing;\n";
fs.writeFileSync('supabase/seed.sql', sql); console.log(rows.length, 'rows -> supabase/seed.sql');
