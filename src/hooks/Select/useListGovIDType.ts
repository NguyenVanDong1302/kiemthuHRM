import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import Mst_GovIDType_service from "services/Kpi/Mst_GovIDType_service";

export const useListGovIDType = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp: any = await Mst_GovIDType_service.GetAllActive();

    if (resp.Success) {
      if (resp.Data) {
        setList(resp.Data);
      }
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return list;
};
