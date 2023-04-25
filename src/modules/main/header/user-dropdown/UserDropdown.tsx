import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Dropdown from "components/dropdown/Dropdown";
import { logoutUser } from "store/reducers/auth";

const ssoDomain: string = `${import.meta.env.VITE_ACC_BASE_URL}`;

const client_id: string = `${import.meta.env.VITE_SOLUTION_CODE}`;

const UserDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    dispatch(logoutUser());

    window.open(`${ssoDomain}/account/signout/${client_id}`);
    window.setTimeout(function () {
      window.close();
    }, 1);
    //
  };

  const navigateToProfile = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate("/profile");
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      onChange={(open: boolean) => setDropdownOpen(open)}
      className="user-menu float-right"
      menuContainerTag="ul"
      buttonTemplate={
        <img
          src={user.Avatar || "/img/default-profile.png"}
          className="img-circle elevation-1"
          style={{
            height: "2rem",
            width: "2rem",
            marginLeft: "-8px !important",
            marginRight: "-0 !important",
          }}
          alt="User"
        />
      }
      menuTemplate={
        <>
          <li className="user-header bg-primary">
            <img
              src={user.Avatar || "/img/default-profile.png"}
              className="img-circle elevation-2"
              alt="User"
            />
            <p>{user.Email}</p>
          </li>
          <li className="user-body"></li>
          <li className="user-footer">
            <button
              type="button"
              className="btn btn-default btn-flat float-right"
              onClick={logOut}
            >
              Signout
            </button>
          </li>
        </>
      }
    />
  );
};

export default UserDropdown;
