import { routeUtil } from 'utils';

import signIn from './actions/sign-in';

const publicRoutes = routeUtil.getRoutes([
  signIn,
]);

const privatePatientRoutes = routeUtil.getRoutes([
]);

const privateOrganizationRoutes = routeUtil.getRoutes([
]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privatePatientRoutes,
  privateOrganizationRoutes,
  adminRoutes,
};
