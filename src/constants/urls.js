// URL地址公共配置，所有用到的url都是放在这里
import config from './config';

const PROTOCOL = 'http://';
const HOST = config.host;
const PORT = '3000';
const PROXY = '/proxy';
const DOMAIN = `${PROTOCOL}${HOST}:${PORT}${PROXY}`;

export const TEST = `${DOMAIN}/test`;
export const LOGIN = `${DOMAIN}/api/user/login`;
export const LOGOUT = `${DOMAIN}/api/auth/user/logout`;
export const CHANGE_PWD = `${DOMAIN}/api/auth/mgmt_account/change_password`;

export const PERMISSIONSTLIST = `${DOMAIN}/api/auth/permissons`;
export const ACCOUNTLIST = `${DOMAIN}/api/auth/user`;
export const ROLELIST = `${DOMAIN}/api/auth/role`;
