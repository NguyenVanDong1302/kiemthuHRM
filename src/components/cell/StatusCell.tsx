import Color from "components/color/Color";
import { useLocalization } from "hooks/useLocalization";
import react from "react";

const StatusCell = ({ status, text }: { status: any; text: any }) => {
  const _l = useLocalization("StatusCell");

  return (
    <div
      style={{
        backgroundColor:
          status === "0" ? Color.inactiveColor : Color.primaryColor,
        fontWeight: "500",
        color: "#fff",
        borderRadius: "3px",
        width: "100px",
        textAlign: "center",
        padding: "3px 0",
      }}
      className="text-sm"
    >
      {_l(status === "0" ? text.Inactive : text.Active)}
    </div>
  );
};

export default StatusCell;
