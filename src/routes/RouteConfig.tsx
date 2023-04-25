// import StaffDetail from "pages/Staff/StaffDetail";

import { HRMPAGE } from "./modules/staffClone";
export interface RouteItem {
  path: string;
  pageTitle?: string;
  mainMenuTitle?: string;
  subMenuTitle?: string;
  mainMenuKey: string;
  subMenuKey?: string;
  permissions?: string;
  getPageElement: Function;
  childrenOf?: string;
}

export const RouteList: RouteItem[] = [
  {
    path: "/",
    mainMenuTitle: "",
    mainMenuKey: "",
    subMenuKey: "",
    subMenuTitle: "",
    permissions: "",
    getPageElement: () => {
      return <></>;
    },
  },
  ...HRMPAGE,

];
