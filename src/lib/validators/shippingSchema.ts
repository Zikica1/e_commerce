import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const sanitize = (value: string) =>
  sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim();

export const shippingFormSchema = z.object({
  name: z
    .string()
    .transform(sanitize)
    .pipe(z.string().min(1, 'Name is require!')),
  email: z
    .email()
    .transform((val) => sanitize(val.toLowerCase()))
    .pipe(z.email('Email is required!')),
  phone: z
    .string()
    .transform(sanitize)
    .pipe(
      z
        .string()
        .min(7, 'Phone number must be between 7 and 10 digits!')
        .max(10, 'Phone number must be between 7 and 10 digits!')
        .regex(/^\d+$/, 'Phone number must contain only numbers!'),
    ),
  address: z
    .string()
    .transform(sanitize)
    .pipe(z.string().min(1, 'Address is required!')),
  city: z
    .string()
    .transform(sanitize)
    .pipe(z.string().min(1, 'City is required!')),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;
