import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import MenuItem from '../menu-item/MenuItem'
import {IMenuItem} from 'utils/themes'

export const MENU: IMenuItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon:'fas fa-th-large'
  },
  
  {
    name: 'Table',
    path: '/table',
    icon:'fas fa-chess-board'
  },
  
  // {
  //   name: 'MainMenu',
  //   children: [
  //     {
  //       name: 'SubMenu',
  //       path: '/blank'
  //     },

  //     {
  //       name: 'Blank',
  //       path: '/blank'
  //     }
  //   ]
  // }
];

const MenuSidebar = () => {
  const user = useSelector((state: any) => state.auth.currentUser);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);
  
  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="navbar-brand">
        <img
          src="/img/logo_HRM.gif"
          alt="logo"
          className="brand-image img-circle elevation-1"
          style={{opacity: '.8'}}
        />
        <span className="brand-text font-weight-light">AdminLTE</span>
      </Link>
      <div className="sidebar">
      
        <nav className="mt-3" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem key={menuItem.name} menuItem={menuItem} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
