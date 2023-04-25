import Link from "components/NetworkLink";
import { useLocalization } from "hooks/useLocalization";
import { IMenuItem } from "utils/themes";

const HeaderMenuItem = ({
  menuItem,
  isActive,
}: {
  menuItem: IMenuItem;
  isActive: boolean;
}) => {
  const _t = useLocalization("MainMenu");

  return (
    <li className="nav-item d-none d-sm-inline-block ml-2 text-dark text-bold">
      <Link
        to={menuItem.path || ""}
        className={`nav-link ${isActive ? "active" : ""}`}
        data-key={menuItem.key}
      >
        {_t(menuItem.name)}
      </Link>
    </li>
  );
};

export default HeaderMenuItem;
