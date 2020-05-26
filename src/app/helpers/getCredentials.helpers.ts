const checkCredentials = localStorage.getItem('credentials');
const credentials = checkCredentials !== null ? JSON.parse(checkCredentials) : 'error';

const checkUsername = localStorage.getItem('username');
const username = checkUsername !== null ? JSON.parse(checkUsername) : 'error';

export const getUserinit = credentials.userInit;
export const getToken = credentials.userToken;
export const getUsername = username;
export const getHtlname = credentials.htlName;
export const getHtlcity = credentials.htlCity;
export const getHtlUrl = credentials.htlUrl;
export const getUserkey = credentials.userKey;
export const clear = function(): void {
  localStorage.clear();
};
export const setToken = function(params: string): void {
  localStorage.setItem("token", JSON.stringify(params));
};
export const setLogin = function(params: string): void {
  localStorage.setItem("login", JSON.stringify(params));
};
export const setUsername = function(params: string): void {
  localStorage.setItem("username", JSON.stringify(params));
};
export default {
  getUserinit,
  getToken,
  setToken,
  setLogin,
  clear,
  setUsername,
  getUsername,
  getHtlname,
  getHtlcity,
  getHtlUrl,
  getUserkey,
};
