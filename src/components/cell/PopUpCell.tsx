import { useState } from "react";
import { Popover, Whisper, Loader } from "rsuite";

import "./css/PopUpCell.css";

const PopUpCell = ({
  rowData,
  dataKey,
  childValueKey,
  code,
  getData,
}: {
  rowData: any;
  dataKey: any;
  childValueKey: any;
  code: any;
  getData: Function;
}) => {
  const [data, setData] = useState([] as any);
  const [loading, setLoading] = useState(true);

  const speaker = (
    <Popover>
      {loading ? (
        <Loader />
      ) : (
        data.map((item: any, index: any) => {
          return (
            <p key={`${item[childValueKey]}${index}`}>{item[childValueKey]}</p>
          );
        })
      )}
    </Popover>
  );

  return (
    <Whisper
      placement="autoVerticalStart"
      trigger="click"
      controlId="control-id-hover"
      speaker={speaker}
      onClick={() => {
        getData(rowData[code]).then((value: any) => {
          setData(value);
          setLoading(false);
        });
      }}
    >
      <span className="popUpCell__container">{rowData[dataKey]}</span>
    </Whisper>
  );
};

export default PopUpCell;
