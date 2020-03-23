/** @format */

import { clear } from "../local-storage";

export const logOut = function(): void {
  clear();
  this.$router.push("/");
};

export default { logOut };
