import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import Mst_AppointType_service from "services/Staff/Mst_AppointType_service";
import Mst_SkillGroup from "services/Staff/Mst_SkillGroup_service";

const useListAppointType = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp: any = await Mst_AppointType_service.getAllActive();
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

export default useListAppointType;
