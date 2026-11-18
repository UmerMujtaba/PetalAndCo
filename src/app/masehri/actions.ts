'use server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase';
const schema = z.object({ name: z.string().min(2), phone: z.string().regex(/^(\+92|0)?3\d{9}$/, 'Enter a valid Pakistani mobile number'), city: z.string().min(2),
  event_date: z.string().optional(), venue: z.string().optional(), budget: z.coerce.number().int().positive().optional(), notes: z.string().max(1000).optional() });
export async function submitInquiry(_: unknown, fd: FormData): Promise<{ ok: boolean; message: string }> {
  const parsed = schema.safeParse(Object.fromEntries([...fd.entries()].map(([k, v]) => [k, v === '' ? undefined : v])));
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  const sb = supabaseServer(); if (!sb) return { ok: false, message: 'Supabase is not configured yet.' };
  const { error } = await sb.from('masehri_inquiries').insert({ ...parsed.data, event_date: parsed.data.event_date ?? null });
  return error ? { ok: false, message: 'Could not send inquiry. Please try WhatsApp.' } : { ok: true, message: 'Thank you! We will contact you shortly.' };
}
