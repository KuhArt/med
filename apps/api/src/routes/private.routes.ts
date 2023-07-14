import mount from 'koa-mount';
import compose from 'koa-compose';

import { AppKoa } from 'types';
import { accountRoutes } from 'resources/account';
import { userRoutes } from 'resources/user';

import auth from './middlewares/auth.middleware';

export default (app: AppKoa, { entityType }) => {
  app.use(mount('/account', compose([auth(entityType), accountRoutes.privateRoutes])));
  app.use(mount('/users', compose([auth(entityType), userRoutes.privateRoutes])));
};
