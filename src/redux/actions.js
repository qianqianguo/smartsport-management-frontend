import * as TestAct from './modules/Test/TestAct';
import * as LoginAct from './modules/Login/LoginAct';
import * as PermissionsAct from './modules/Permissions/PermissionsAct';
import * as RoleAct from './modules/Role/RoleAct';
import * as AccountAct from './modules/Account/AccountAct';
import * as AddAccountAct from './modules/ManageAccount/AddAccountAct';
import * as EditAccountAct from './modules/ManageAccount/EditAccountAct';
import * as AddRoleAct from './modules/ManageRole/AddRoleAct';
import * as EditRoleAct from './modules/ManageRole/EditRoleAct';
import * as FetchRoleAct from './modules/ManageRole/FetchRoleAct';

export default {
  ...TestAct,
  ...LoginAct,
  ...PermissionsAct,
  ...RoleAct,
  ...AccountAct,
  ...AddAccountAct,
  ...EditAccountAct,
  ...AddRoleAct,
  ...EditRoleAct,
  ...FetchRoleAct,
};
