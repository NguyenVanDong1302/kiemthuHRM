import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import Mst_FamilyStatus from "services/Staff/Mst_FamilyStatus_service";

const useListFamilyStatus = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp: any = await Mst_FamilyStatus.GetAllActive();

    if (resp.Success) {
      setList(resp.Data ? resp.Data : []);
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return list;
};

export default useListFamilyStatus;
