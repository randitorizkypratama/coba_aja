/** @format */

export const users = JSON.parse(localStorage.getItem("login")!);
export const token = JSON.parse(localStorage.getItem("token")!);
export const getUsername = JSON.parse(localStorage.getItem("username")!);
export const clear = function(): void {
  localStorage.clear();
};
export const setToken = function(params: string): void {
  localStorage.setItem("token", JSON.stringify(params));
};
export const setLogin = function(params: string): void {
  localStorage.setItem("login", JSON.stringify(params));
};
export const username = function username(params: string): void {
  localStorage.setItem("username", JSON.stringify(params));
};
export default {
  users,
  token,
  setToken,
  setLogin,
  clear,
  username,
  getUsername
};
