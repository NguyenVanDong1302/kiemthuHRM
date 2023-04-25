import store from "store/store";
import * as api from "./helper";

const ccsDomain: string = `${import.meta.env.VITE_CCS_BASE_URL}`;
const igossAppId: string = `${import.meta.env.VITE_IGOSS_APP_ID}`;
const igossAppSecret: string = `${import.meta.env.VITE_IGOSS_APP_SECRET}`;

export const login = async (email: string, password: string) => {
  let resp = await api.post(`${ccsDomain}/api/account/login`, {
    email: email,
    password: password,
  });

  if (resp.Success) {
    //let token = resp.data.accessToken;
    //localStorage.setItem('token', token);

    return resp.Data;
  }

  throw Error("invalid login");
};

export const getSessionInfo = async (token: any, networkId: any) => {
  let resp = await api.get(`${ccsDomain}/api/account/getSessionInfo`, {
    networkId: networkId ? networkId : "0",
    token: token,
  });

  return resp;
};

export const loginIgoss = async (code: any, networkId: any) => {
  let resp = await api.get(`${ccsDomain}/api/account/LoginIgoss`, {
    code: code,
    appId: igossAppId,
    appSecret: igossAppSecret,
    networkId: networkId,
  });

  return resp;
};

export const getMyNetworkList = async () => {
  const { token } = store.getState().auth;

  let resp = await api.get(`${ccsDomain}/api/account/getMyNetworks`, {
    token: token,
  });

  return resp;
};

export const register = async () => {};
