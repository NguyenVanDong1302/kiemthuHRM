import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import general_master_service from "services/general_master_service";

export const useListBiz = () => {
  const [list, setList] = useState([] as any);
  const fetch = async () => {
    const resp: any = await general_master_service.bizType_GetAllActive();
    if (resp.Success) {
      setList(resp.Data);
    } else {
      setList([]);
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return list;
};
