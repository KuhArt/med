import { z } from 'zod';

const schema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  passwordHash: z.string().nullable().optional(),
  signupToken: z.string().nullable().optional(),
  resetPasswordToken: z.string().nullable().optional(),
  isEmailVerified: z.boolean().default(false),
  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  lastRequest: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
  status: z.enum(['removed', 'active']),
}).strict();

export default schema;
