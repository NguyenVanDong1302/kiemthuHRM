import { useNetworkLocaltion } from "hooks/useNetworkLocation";
import { useNetworkNavigate } from "hooks/useNetworkNavigate";
import { usePermission } from "hooks/usePermission";
import Header from "modules/main/header/Header";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { RouteList } from "routes/RouteConfig";
import { Container } from "rsuite";
import * as AuthService from "services/auth_service";
import general_master_service from "services/general_master_service";
import * as localization_service from "services/localization_service";
import { loadPermissions, loadUser, logoutUser } from "store/reducers/auth";
import { setOrgInfo } from "store/reducers/orgInfo";
import {
  addWindowClass,
  removeWindowClass,
  setActiveMainMenu,
} from "utils/common";

import { toast } from "react-toastify";
import { clearSavingData, loadData } from "store/reducers/localization";
import store from "store/store";
import { ContainerWrapper } from "../../styled";
const Main = () => {
  const { networkId } = useParams();

  const dispatch = useDispatch();
  // const menuSidebarCollapsed = useSelector(
  //   (state: any) => state.ui.menuSidebarCollapsed
  // );
  // const controlSidebarCollapsed = useSelector(
  //   (state: any) => state.ui.controlSidebarCollapsed
  // );
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [mainMenuKey, setMainMenuKey] = useState("");

  const [systemTitle, setSystemTitle] = useState(
    `${import.meta.env.VITE_TITLE}`
  );

  const handleToggleMenuSidebar = () => {
    //dispatch(toggleSidebarMenu());
  };

  const initLocalizationData = async () => {
    let resp = await localization_service.loadData();

    if (resp.Success) dispatch(loadData(resp.Data));
    else toast.error(resp.ErrorMessage);
  };

  const updateLocalizationData = async () => {
    const { saving } = store.getState().localizationData;

    if (saving && saving.length > 0) {
      localization_service.addData(saving).then((resp) => {
        if (resp.Success) {
          initLocalizationData();
        }
      });

      dispatch(clearSavingData());
    }
  };

  const login = async () => {
    try {
      let resp = await AuthService.getSessionInfo(
        localStorage.getItem("token"),
        0
      );

      if (resp.Success) {
        dispatch(loadUser(resp.Data.CurrentUser));
        setIsAppLoaded(true);
        return true;
      } else {
        dispatch(logoutUser());
        //await sleep(10000);
        setIsAppLoaded(true);

        return false;
      }
    } catch (error) {
      //dispatch(logoutUser());
      //await sleep(1000);
      //setIsAppLoaded(true);
      return false;
    }
  };

  const fetchProfile = async () => {
    try {
      let resp = await AuthService.getSessionInfo(
        localStorage.getItem("token"),
        networkId
      );

      if (resp.Success) {
        dispatch(loadUser(resp.Data.CurrentUser));
        dispatch(
          setOrgInfo({
            OrgId: resp.Data.OrgId,
            NetworkId: resp.Data.NetworkId,
            OrgData: resp.Data.OrgData,
          })
        );
        await initLocalizationData();
        var rpdata = await general_master_service.getCurrentUserPermissions();

        //var permissions= pda
        if (rpdata.Success && rpdata.Data) {
          var listAccess = rpdata.Data.Lst_Sys_Access;
          if (listAccess)
            var permissions = listAccess.map((i: any) => i.ObjectCode);

          dispatch(loadPermissions(permissions));
        }

        //await sleep(1000);
        setIsAppLoaded(true);
      } else {
        dispatch(logoutUser());
        //await sleep(10000);
        setIsAppLoaded(true);
      }
    } catch (error) {
      //dispatch(logoutUser());
      //await sleep(1000);
      //setIsAppLoaded(true);
    }
  };

  let curLoc = useNetworkLocaltion();
  const hasPermission = usePermission();
  const navigate = useNetworkNavigate();
  const navigateOriginal = useNavigate();

  useEffect(() => {
    if (!networkId) {
      login().then((ret) => {
        if (ret) navigateOriginal("/selectnetwork");
      });
    } else if (!Number.parseFloat(networkId)) {
      navigateOriginal("/notfound");
    } else {
      removeWindowClass("register-page");
      removeWindowClass("login-page");
      removeWindowClass("hold-transition");

      //addWindowClass('sidebar-mini');

      addWindowClass("layout-top-nav");

      fetchProfile();
    }
    return () => {
      //removeWindowClass('sidebar-mini');
    };
  }, []);

  useEffect(() => {
    let currentRoute = RouteList.find((r) => curLoc.equalPath(r.path));
    if (currentRoute) {
      //console.log("currentRoute", currentRoute);
      setMainMenuKey(currentRoute.mainMenuKey);
      setTimeout(() => {
        if (currentRoute) setActiveMainMenu(currentRoute.mainMenuKey);
      }, 10);

      if (currentRoute.pageTitle) {
        document.title = `${currentRoute.pageTitle} - ${systemTitle}`;
      } else document.title = systemTitle;

      if (!hasPermission(currentRoute.permissions)) {
        navigate("/notfound");
      }
    }
    //else setActiveMainMenu('');

    updateLocalizationData();
  }, [curLoc.fullLocation]);

  // useEffect(() => {
  //   removeWindowClass('sidebar-closed');
  //   removeWindowClass('sidebar-collapse');
  //   removeWindowClass('sidebar-open');
  //   //addWindowClass('layout-top-nav');

  //   if (menuSidebarCollapsed && screenSize === 'lg') {
  //     addWindowClass('sidebar-collapse');
  //   } else if (menuSidebarCollapsed && screenSize === 'xs') {
  //     addWindowClass('sidebar-open');
  //   } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
  //     addWindowClass('sidebar-closed');
  //     addWindowClass('sidebar-collapse');
  //   }
  // }, [screenSize, menuSidebarCollapsed]);

  // useEffect(() => {
  //   if (controlSidebarCollapsed) {
  //     removeWindowClass('control-sidebar-slide-open');
  //   } else {
  //     addWindowClass('control-sidebar-slide-open');
  //   }
  // }, [screenSize, controlSidebarCollapsed]);

  const getAppTemplate = useCallback(() => {
    if (!isAppLoaded) {
      return (
        <div className="preloader d-flex flex-column justify-content-center align-items-center">
          <img
            className="animation__shake"
            src="/img/logo_HRM.gif"
            alt="idocNetHRM logo"
            height="100"
            width="100"
          />
        </div>
      );
    }
    return (
      <>
        <Header mainMenuKey={mainMenuKey} />
        <section className="content">
          <div className="sidebar-page">
            <section className="content">
              <Container>
                <Outlet />
              </Container>
            </section>
          </div>
        </section>
        {/* <MenuSidebar /> */}
        {/* <div className="content-wrapper">
          <div className="pt-3" />
          <section className="content">
            <Outlet />
          </section>
        </div> */}
      </>
    );
  }, [isAppLoaded]);

  return (
    <div className="wrapper">
      <ContainerWrapper>{getAppTemplate()}</ContainerWrapper>
    </div>
  );
};

export default Main;
