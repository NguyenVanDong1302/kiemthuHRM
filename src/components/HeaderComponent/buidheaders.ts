import store from "store/store";
export const AppAgent: string = `${import.meta.env.VITE_AGENT}`;
export const GwUserCode: string = `${import.meta.env.VITE_GW_USER}`;
export const GwUserPassword: string = `${import.meta.env.VITE_GW_USER_PW}`;
export const API_BASE_URL: string = `${import.meta.env.VITE_API_BASE_URL}`;
export const buildHeaders = () => {
  const { token } = store.getState().auth;
  const { NetworkId, OrgId } = store.getState().orgInfo;

  let headers = {
    Authorization: token ? `Bearer ${token}` : "",
    AppAgent: AppAgent,
    GwUserCode: GwUserCode,
    GwPassword: GwUserPassword,
    NetworkId: NetworkId,
    OrgId: OrgId,
  };
  return headers;
};

export const buildUrl = (url: string) => {
  return `${API_BASE_URL}/${url}`;
};
