import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import Mst_PersonalBackground from "services/Staff/Mst_PersonalBackground_service";

const useListPersonalBackground = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp: any = await Mst_PersonalBackground.GetAllActive();

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

export default useListPersonalBackground;
