import ky from "ky";
const login = localStorage.getItem("tes");
export function api() {
  const data = (async () => {
    const parsed = await ky
      .post("http://54.251.169.160:8080/logserver/rest/loginServer/loginAuth", {
        json: {
          request: {
            countryId: "ENG",
            userName: JSON.parse(login).email,
            userPswd: JSON.parse(login).password
          }
        }
      })
      .json();
    return parsed;
  })();

  return data;
}
