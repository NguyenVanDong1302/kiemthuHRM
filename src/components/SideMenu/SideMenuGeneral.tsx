import { useNetworkLocaltion } from "hooks/useNetworkLocation";
import { usePermission } from "hooks/usePermission";
import { memo, useEffect, useState } from "react";
import { RouteList } from "routes/RouteConfig";
import SideMenu from "./Shared/SideMenu";

const SideMenuGeneral = () => {
  let location = useNetworkLocaltion();
  const hasPermission = usePermission();
  const [ckey, setCkey] = useState("");
  const [menu, setMenu] = useState<any>([]);

  useEffect(() => {
    let menuList: any = [];
    let currentRoute: any = RouteList.find((r) => location.equalPath(r.path));
    if (currentRoute && currentRoute.mainMenuKey) {
      setCkey(currentRoute.subMenuKey);
      var list = RouteList.filter(
        (ri) => ri.mainMenuKey == currentRoute.mainMenuKey
      );

      for (var item of list) {
        if (item.subMenuTitle && hasPermission(item.permissions))
          menuList.push({
            ...item,
            path: item.path,
            name: item.subMenuTitle,
            key: item.subMenuKey,
          });
      }
    }

    setMenu(menuList);
  }, [location.pathname]);

  return <SideMenu menu={menu} activeKey={ckey} />;
};
export default memo(SideMenuGeneral);
