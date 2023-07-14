import { AppKoaContext, Next } from 'types';

const auth = (entityType = 'staff') => (ctx: AppKoaContext, next: Next) => {
  if (ctx.state.user && ctx.state.userEntityType === entityType) {
    return next();
  }

  ctx.status = 401;
  ctx.body = {};

  return null;
};

export default auth;
