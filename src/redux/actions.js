import * as TestAct from './modules/Test/TestAct';
import * as LoginAct from './modules/Login/LoginAct';
import * as PermissionsAct from './modules/Permissions/PermissionsAct';
import * as RoleAct from './modules/Role/RoleAct';
import * as AccountAct from './modules/Account/AccountAct';

export default {
  ...TestAct,
  ...LoginAct,
  ...PermissionsAct,
  ...RoleAct,
  ...AccountAct,
};
