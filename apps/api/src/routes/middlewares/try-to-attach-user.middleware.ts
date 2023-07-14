import { AppKoaContext, Next } from 'types';
import { patientService } from 'resources/patient';
import { staffService } from 'resources/staff';
import { tokenService } from 'resources/token';

const entityServiceMap = {
  patient: patientService,
  staff: staffService,
};

const tryToAttachUser = async (ctx: AppKoaContext, next: Next) => {
  const accessToken = ctx.state.accessToken;
  let userData;

  if (accessToken) {
    userData = await tokenService.findTokenByValue(accessToken);
  }

  if (userData && userData.userId) {
    const userService = entityServiceMap[userData.entity];
    const user = await userService.findOne({ _id: userData.userId });

    if (user) {
      await userService.updateLastRequest(userData.userId);

      ctx.state.user = user;
      ctx.state.userEntityType = userData.entity;
      ctx.state.isShadow = userData.isShadow || false;
    }
  }

  return next();
};

export default tryToAttachUser;
