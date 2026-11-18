import { DELIVERY_FEES, FREE_DELIVERY_ABOVE } from './config';
export const formatPKR = (n: number) => `Rs. ${Math.round(n).toLocaleString('en-US')}`;
export const deliveryFee = (city: string, subtotal: number) =>
  subtotal >= FREE_DELIVERY_ABOVE ? 0 : (DELIVERY_FEES[city] ?? DELIVERY_FEES.Others);
