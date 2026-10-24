import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const sanitize = (value: string) =>
  sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim();

export const paymentFormSchema = z.object({
  cardName: z
    .string()
    .transform(sanitize)
    .pipe(z.string().min(1, 'Name is require!')),
  cardNumber: z
    .string()
    .transform(sanitize)
    .pipe(z.string().regex(/^\d{16}$/, 'Card number must contain 16 digits!')),
  expirationDate: z
    .string()
    .transform(sanitize)
    .pipe(
      z
        .string()
        .regex(
          /^(0[1-9]|1[0-2])\/\d{2}$/,
          'Expiration date must be in MM/YY format!',
        ),
    ),

  cvv: z
    .string()
    .transform(sanitize)
    .pipe(z.string().regex(/^\d{3}$/, 'CVV must contain 3 digits!')),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;
