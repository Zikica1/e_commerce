import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const sanitize = (value: string) =>
  sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim();

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must have at least 3 characters')
    .regex(USER_REGEX, 'Invalid username')
    .transform(sanitize),

  email: z.email().transform((val) => sanitize(val).toLocaleLowerCase()),

  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .regex(PWD_REGEX, 'Invalid password'),
});
