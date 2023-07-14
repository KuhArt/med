import { routeUtil } from 'utils';

import signIn from './actions/sign-in';

const publicRoutes = routeUtil.getRoutes([
  signIn,
]);

const privateRoutes = routeUtil.getRoutes([
]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
