import React, { useCallback, useEffect, useState } from "react";
import Link from "components/NetworkLink";
import { Button } from "components/core";

import UserDropdown from "modules/main/header/user-dropdown/UserDropdown";
import HeaderMenu from "./Menu/HeaderMenu";
import PermissionContainer from "components/PermissionContainer";

const Header = ({ mainMenuKey }: { mainMenuKey: string }) => {
  return (
    <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div className="container header-container">
        <Link to="/" className="nav-link d-flex align-items-center">
          <img className="brand-image" src="/img/logo.png" alt="logo" />
          <span className="brand-text font-weight-bold text-dark">HRM+</span>
        </Link>
        <HeaderMenu mainMenuKey={mainMenuKey} />
        <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
          <UserDropdown />
        </ul>
      </div>
    </nav>
  );
};

export default Header;
