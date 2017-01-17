// URL地址公共配置，所有用到的url都是放在这里
import config from './config'

const PROTOCOL = 'http://';
const HOST = config.host;
const PORT = '3000';
const PROXY = '/proxy';
const DOMAIN = `${PROTOCOL}${HOST}:${PORT}${PROXY}`;

export const TEST = `${DOMAIN}/test`;

