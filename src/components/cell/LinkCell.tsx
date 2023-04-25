import Color from "components/color/Color";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/LinkCell.css";
import store from "store/store";

const LinkCell = ({
  rowData,
  code,
  dataKey,
  url,
}: {
  rowData: any;
  code: string;
  dataKey: any;
  url: string;
}) => {
  const navigate = useNavigate();
  const { OrgId, NetworkId } = store.getState().orgInfo;

  const redirect = () => {
    navigate(`/${NetworkId}${url}${rowData[code]}`);
  };
  return (
    <>
      <p onClick={redirect} className="link">
        {rowData[dataKey]}
      </p>
      {/* <Link to={`${url}${rowData[code]}`} className="linkCell__container">
        {rowData[dataKey]}
      </Link> */}
    </>
  );
};

export default LinkCell;
