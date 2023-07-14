import { z } from 'zod';

import schema from './staff.schema';

export type Staff = z.infer<typeof schema>;
