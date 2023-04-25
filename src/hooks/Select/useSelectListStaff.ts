import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import staff_service from "services/Staff/staff_service";

const useSelectListStaff = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp = await staff_service.getAllActive();
    if (resp.Success) {
      if (resp.Data.Lst_Staff_Staff) {
        setList(resp.Data.Lst_Staff_Staff);
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

export default useSelectListStaff;
