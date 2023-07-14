import { z } from 'zod';

import { Patient, patientService } from 'resources/patient';

import { rateLimitMiddleware, validateMiddleware } from 'middlewares';
import { securityUtil } from 'utils';
import { authService } from 'services';

import { AppKoaContext, AppRouter, Next } from 'types';

const schema = z.object({
  email: z.string().min(1, 'Please enter email').email('Email format is incorrect.'),
  password: z.string().min(1, 'Please enter password'),
});

interface ValidatedData extends z.infer<typeof schema> {
  patient: Patient;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { email, password } = ctx.validatedData;

  const patient = await patientService.findOne({ email });

  ctx.assertClientError(patient && patient.passwordHash, {
    credentials: 'The email or password you have entered is invalid',
  });

  const isPasswordMatch = await securityUtil.compareTextWithHash(password, patient.passwordHash);

  ctx.assertClientError(isPasswordMatch, {
    credentials: 'The email or password you have entered is invalid',
  });

  ctx.assertClientError(patient.isEmailVerified, {
    email: 'Please verify your email to sign in',
  });

  ctx.validatedData.patient = patient;
  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { patient } = ctx.validatedData;

  await Promise.all([
    patientService.updateLastRequest(patient._id),
    authService.setTokens(ctx, patient._id),
  ]);

  ctx.body = patientService.getPublic(patient);
}

export default (router: AppRouter) => {
  router.post('/sign-in', rateLimitMiddleware, validateMiddleware(schema), validator, handler);
};
