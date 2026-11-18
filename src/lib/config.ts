// Single place to change brand, contact and delivery rules.
export const BRAND = { name: 'Petal & Co.', tagline: 'Thoughtfully curated gifts & décor, delivered across Pakistan', whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '923000000000' };
export const FREE_DELIVERY_ABOVE = 8000;
export const DELIVERY_FEES: Record<string, number> = { Lahore: 250, Karachi: 350, 'Islamabad/Rawalpindi': 300, Faisalabad: 300, Others: 450 };
