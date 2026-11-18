'use client';
import { useFormState } from 'react-dom';
import { submitInquiry } from '@/app/masehri/actions';
export default function InquiryForm() {
  const [state, action] = useFormState(submitInquiry, { ok: false, message: '' });
  return (<form action={action} className="card mx-auto grid max-w-xl gap-3 p-6">
    <input name="name" placeholder="Full name" className="input" required aria-label="Name" /><input name="phone" placeholder="03XX XXXXXXX" className="input" required aria-label="Phone" />
    <input name="city" placeholder="City" className="input" required aria-label="City" /><input name="event_date" type="date" className="input" aria-label="Event date" />
    <input name="venue" placeholder="Venue" className="input" aria-label="Venue" /><input name="budget" type="number" placeholder="Budget (Rs.)" className="input" aria-label="Budget" />
    <textarea name="notes" placeholder="Notes" rows={3} className="input" aria-label="Notes" /><button className="btn btn-gold">Send inquiry</button>
    {state.message && <p role="status" className={state.ok ? 'text-sage' : 'text-red-700'}>{state.message}</p>}</form>);
}
