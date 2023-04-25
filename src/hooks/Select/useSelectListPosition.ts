import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import position_service from "services/Admin/position_service";

const useSelectListPosition = () => {
  const [list, setList] = useState<any[]>([]);

  const fetch = async () => {
    const resp = await position_service.getAllActive();
    if (resp.Success) {
      setList(resp.Data);
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return list;
};

export default useSelectListPosition;
