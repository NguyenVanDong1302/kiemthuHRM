import Color from "components/color/Color";
import React from "react";

const CountCell = ({
  rowData,
  handleClick,
  type,
  quantity,
}: {
  rowData: any;
  handleClick: Function;
  type: any;
  quantity: any;
}) => {
  return (
    <p
      onClick={() => handleClick(rowData[type])}
      style={{
        color: Color.primaryColor,
        fontWeight: "600",
        cursor: "pointer ",
      }}
    >
      {rowData[quantity]}
    </p>
  );
};

export default CountCell;
