import LOGIN from "./action.type";

const action = {
  [LOGIN](context, credentials) {
    console.log("context123", context);
    console.log("context123", credentials);
  }
};
