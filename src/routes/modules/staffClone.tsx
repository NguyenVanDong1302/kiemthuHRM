import DetailStaff from "pages/HRM/HRMComponent/DetailStaff/Detail_Staff";
import HRM from "pages/HRM/HRM";
import { RouteItem } from "routes/RouteConfig";
import DetailStaffEdit from "pages/HRM/HRMComponent/DetailStaff/DetailStaffEdit";

export const HRMPAGE: RouteItem[] = [
    {
        path: "/HRM",
        pageTitle: "HRM",
        mainMenuKey: "HRM",
        subMenuKey: "HRM",
        mainMenuTitle: "HRM",
        subMenuTitle: "",
        getPageElement: () => {
            return <HRM />;
        },
    },
    {
        path: "/HRM/detail/:StaffCode",
        pageTitle: "",
        mainMenuKey: "HRM",
        subMenuKey: "HRM",
        mainMenuTitle: "",
        subMenuTitle: "",
        getPageElement: () => {
            return <DetailStaff />;
        },
    },

    {
        path: "/HRM/staffEdit/:StaffCode",
        pageTitle: "",
        mainMenuKey: "HRM",
        subMenuKey: "HRM",
        mainMenuTitle: "",
        subMenuTitle: "",
        getPageElement: () => {
            return <DetailStaffEdit isNew={false} />;
        },
    },
    {
        path: "/HRM/staffCreate",
        pageTitle: "",
        mainMenuKey: "HRM",
        subMenuKey: "HRM",
        mainMenuTitle: "",
        subMenuTitle: "",
        getPageElement: () => {
            return <DetailStaffEdit isNew={true} />;
        },
    },
];
