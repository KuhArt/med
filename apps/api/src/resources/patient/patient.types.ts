import { z } from 'zod';

import schema from './patient.schema';

export type Patient = z.infer<typeof schema>;
