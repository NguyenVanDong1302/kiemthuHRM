import { useNavigate } from "react-router-dom";
import store from "store/store";
export const useNetworkNavigate = () => {
  const { NetworkId } = store.getState().orgInfo;
  const navi = useNavigate();
  const navigate = (str: string) => {
    return navi(`/${NetworkId}${str}`);
  };

  return navigate;
};
