import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import HeaderMenuItem from "./HeaderMenuItem";

import { usePermission } from "hooks/usePermission";
import { RouteList } from "routes/RouteConfig";

const HeaderMenu = ({ mainMenuKey }: any) => {
  const hasPermission = usePermission();

  const [menu, setMenu] = useState<any>([]);

  useEffect(() => {
    let menuList: any = [];

    for (var item of RouteList) {
      if (item.mainMenuTitle && hasPermission(item.permissions)) {
        menuList.push({
          path: item.path,
          name: item.mainMenuTitle,
          key: item.mainMenuKey,
        });
      }
    }

    setMenu(menuList);
  }, []);

  return (
    <ul className="navbar-nav">
      {menu.map((menuItem: any) => (
        // <HeaderMenuItem menuItem={menuItem} isActive={mainMenuKey == menuItem.key ? true : false} key={uuid()} />
        <HeaderMenuItem
          menuItem={menuItem}
          isActive={mainMenuKey == menuItem.key ? true : false}
          key={uuid()}
        />
      ))}
    </ul>
  );
};

export default HeaderMenu;
