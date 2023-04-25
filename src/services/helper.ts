import { toast } from "react-toastify";
import store from "store/store";

const API_BASE_URL: string = `${import.meta.env.VITE_API_BASE_URL}`;
const AppAgent: string = `${import.meta.env.VITE_AGENT}`;
const GwUserCode: string = `${import.meta.env.VITE_GW_USER}`;
const GwUserPassword: string = `${import.meta.env.VITE_GW_USER_PW}`;

console.log(API_BASE_URL, AppAgent, GwUserCode, GwUserPassword);

const postWithHeader = async (url: string, headers: any, params: any) => {
  try {
    if (!params) params = {};

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(params),
    };

    let fullUrl = url.indexOf("http") === 0 ? url : API_BASE_URL + "/" + url;

    const response = await fetch(fullUrl, requestOptions);
    const data = await response.json();

    return data;
  } catch (error: any) {
    toast.error(error.message || "Failed");
  }
};

const postWithHeaders = async (url: string, headers: any, params: any) => {
  try {
    if (!params) params = {};

    const myArray = Object.keys(params).map((key) => {
      return { key: key, value: params[key] };
    });

    let formData = new FormData();
    for (let index = 0; index < myArray.length; index++) {
      const element = myArray[index];
      formData.append(element.key, element.value);
    }
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formData,
    };

    let fullUrl = url.indexOf("http") === 0 ? url : API_BASE_URL + "/" + url;
    const response = await fetch(fullUrl, requestOptions);
    const data = await response.json();
    return data;
  } catch (error: any) {
    toast.error(error.message || "Failed");
  }
};

const posts = async (url: string, params: any) => {
  const { token } = store.getState().auth;
  const { NetworkId, OrgId } = store.getState().orgInfo;

  let headers = {
    Authorization: token ? `Bearer ${token}` : "",
    AppAgent: AppAgent,
    GwUserCode: GwUserCode, //
    GwPassword: GwUserPassword, //
    NetworkId: NetworkId, //
    OrgId: OrgId, //
  };

  return postWithHeaders(url, headers, params);
};

const post = async (url: string, params: any) => {
  const { token } = store.getState().auth;
  const { NetworkId, OrgId } = store.getState().orgInfo;

  let headers = {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
    Authorization: token ? `Bearer ${token}` : "",
    AppAgent: AppAgent,
    GwUserCode: GwUserCode,
    GwPassword: GwUserPassword,
    NetworkId: NetworkId,
    OrgId: OrgId,
  };

  return postWithHeader(url, headers, params);
};

const get = async (url: string, params: any) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    let query: string = "";

    if (params) {
      let queryString = new URLSearchParams(params).toString();

      if (url.indexOf("=") > 0) query = "&" + queryString;
      else query = "?" + queryString;
    }

    let fullUrl = url.indexOf("http") === 0 ? url : API_BASE_URL + "/" + url;

    const response = await fetch(fullUrl + query, requestOptions);
    const data = await response.json();
    return data;
  } catch (error: any) {
    toast.error(error.message || "Failed");
  }
};

export { post, get, postWithHeader, posts };
