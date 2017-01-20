// URL地址公共配置，所有用到的url都是放在这里
import config from './config';

const PROTOCOL = 'http://';
const HOST = config.host;
const PORT = config.port;
const PROXY = '/proxy';
const DOMAIN = `${PROTOCOL}${HOST}:${PORT}${PROXY}`;

export const TEST = `${DOMAIN}/test`;
export const LOGIN = `${DOMAIN}/api/user/login`;
export const LOGOUT = `${DOMAIN}/api/auth/user/logout`;
export const CHANGE_PWD = `${DOMAIN}/api/auth/user/change_password`;

export const PERMISSIONSTLIST = `${DOMAIN}/api/auth/permission`;
export const ACCOUNTLIST = `${DOMAIN}/api/auth/user`;
export const ROLELIST = `${DOMAIN}/api/auth/role`;

export const URL_ADDACCOUNT = `${DOMAIN}/api/auth/user`;// 添加账号接口
export const URL_EDITACCOUNT = `${DOMAIN}/api/auth/user/:id`;// 编辑账号接口
export const URL_ADDROLE = `${DOMAIN}/api/auth/role`;// 添加角色接口（需要先查询获取角色）
export const URL_EDITROLE = `${DOMAIN}/api/auth/role/587f4d3aa224c362ae104de7?selectedRoleId=587f4e855f73a361d1a6b30c`;// 编辑更新角色接口
export const URL_FETCHROLE = `${DOMAIN}/api/auth/role/get`;// 获取角色选择数据接口