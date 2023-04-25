import Link from "components/NetworkLink";
import { useLocalization } from "hooks/useLocalization";
import { Sidenav, Nav } from "rsuite";
import { v4 as uuid } from "uuid";
const SideMenuItem = ({
  menuItem,
  isActive,
}: {
  menuItem: any;
  isActive?: string;
}) => {
  const _t = useLocalization("SideMenu");
  return (
    <li className="nav-item">
      {menuItem.array.length ? (
        <Sidenav defaultOpenKeys={["3", "4"]}>
          <Sidenav.Body>
            <Nav>
              <Nav.Menu title={_t(menuItem.name)}>
                {menuItem.array.map((item: any) => {
                  return (
                    <Link
                      key={uuid()}
                      to={item.path || ""}
                      className={`nav-link ${
                        isActive === item.key ? "active" : ""
                      }`}
                    >
                      {_t(item.name)}
                    </Link>
                  );
                })}
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      ) : (
        <Link
          to={menuItem.path || ""}
          className={`nav-link ${isActive === menuItem.name ? "active" : ""} `}
        >
          {_t(menuItem.name)}
        </Link>
      )}
    </li>
  );
};

export default SideMenuItem;
