/** @format */

export const users = JSON.parse(localStorage.getItem("login"));
export const token = JSON.parse(localStorage.getItem("token"));
export const setToken = function(params: string): void {
  console.log("tes2", params);
  localStorage.setItem("token", JSON.stringify(params));
};
export const setLogin = function(params: string): void {
  console.log("tes1", params);

  localStorage.setItem("login", JSON.stringify(params));
};
export default { users, token, setToken, setLogin };
