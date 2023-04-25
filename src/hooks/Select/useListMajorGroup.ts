import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import Mst_MajorGroup_service from "services/Staff/Mst_MajorGroup_service";

const useListMajorGroup = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp: any = await Mst_MajorGroup_service.GetAllActive();

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

export default useListMajorGroup;
