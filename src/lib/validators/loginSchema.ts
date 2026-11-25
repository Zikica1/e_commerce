import { z } from 'zod';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const loginSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must have at least 8 characters')
      .regex(PWD_REGEX, 'Invalid password')
      .trim(),
    email: z.email(),
  })
  .strict();
