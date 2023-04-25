import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import Mst_RelativeInfo_service from "services/Staff/Mst_RelativeInfo_service";

const useListRelativeInfo = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp: any = await Mst_RelativeInfo_service.GetRelativeType();

    if (resp.Success) {
      setList(
        resp.Data.Lst_RelativeType
          ? resp.Data.Lst_RelativeType.map((item: any) => {
              return {
                label: item,
                value: item,
              };
            })
          : []
      );
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return list;
};

export default useListRelativeInfo;
