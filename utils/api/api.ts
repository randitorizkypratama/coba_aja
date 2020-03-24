/** @format */
import { modul } from "./config";
console.log("modul12", modul.HTTP + modul.WEB_SERVICE + modul.URL);

export const API_URL = modul.HTTP + modul.WEB_SERVICE + modul.URL + "vhpINV/";
export const API_LOGIN =
  "http://54.251.169.160:8080/logserver/rest/loginServer/";

export const FETCH_COMMON = "http://ws1.e1-vhp.com/VHPWebBased/rest/Common/";
export default { API_URL, API_LOGIN, FETCH_COMMON };
