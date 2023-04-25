import Icon from "@rsuite/icons/lib/Icon";
import React, { useRef, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IconButton, Sidebar } from "rsuite";
import { addWindowClass, removeWindowClass } from "utils/common";
import { v4 as uuid } from "uuid";
import SideMenuItem from "./SideMenuItem";
import { useWindowSize } from "hooks/useWindowSize";
import { RouteItem } from "routes/RouteConfig";
import { SideMenuContainer } from "./SideMenu_styled";

interface RouteItemMenu extends RouteItem {
  array: any[];
}

const SideMenu = ({ menu, activeKey }: any) => {
  const [expanded, setExpanded] = React.useState(true);
  const windowSize = useWindowSize();

  const newMenu: RouteItemMenu[] = menu.map((item: RouteItem) => {
    return {
      ...item,
      array: [],
    };
  });

  const filterMenuChildren = [...newMenu].filter((itemFilter: RouteItem) => {
    return itemFilter.childrenOf;
  });

  const filterMenuParent = [...newMenu].filter((itemFilter: RouteItem) => {
    return !itemFilter.childrenOf;
  });

  const mapList = [...filterMenuParent].map((itemParent: RouteItemMenu) => {
    const isInclude = filterMenuChildren.filter((itemFilter: RouteItemMenu) => {
      return itemFilter.childrenOf === itemParent.subMenuTitle;
    });
    if (isInclude.length) {
      return {
        ...itemParent,
        array: isInclude,
      };
    } else {
      return itemParent;
    }
  });

  return (
    <>
      <Sidebar
        className="page-sidebar"
        style={{
          zIndex: 1,
        }}
        width={expanded ? 260 : 0}
        collapsible
      >
        <SideMenuContainer>
          <IconButton
            style={{ padding: "14px !important" }}
            icon={<Icon as={FiMenu} />} // appearance="subtle"
            onClick={() => {
              if (expanded) {
                setExpanded(false);
                addWindowClass("side-min");
              } else {
                setExpanded(true);
                removeWindowClass("side-min");
              }
            }}
            appearance="subtle"
            className="toggle-btn mt-1"
          />
          <nav
            className="mt-3 p-2 side-nav"
            style={{
              overflow: "auto",
              height: `${windowSize.height - 120}px`,
            }}
          >
            <ul className={`nav nav-pills nav-sidebar flex-column`} role="menu">
              {mapList.map((menuItem: any) => {
                return (
                  <SideMenuItem
                    key={uuid()}
                    menuItem={menuItem}
                    isActive={activeKey}
                  />
                );
              })}
            </ul>
          </nav>
        </SideMenuContainer>
      </Sidebar>
    </>
  );
};
export default SideMenu;
