import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import department_service from "services/Admin/department_service";

const useSelectListDepartment = () => {
  const [list, setList] = useState<any[]>([]);
  const fetch = async () => {
    const resp = await department_service.getAllActive();
    if (resp.Success) {
      setList(resp.Data);
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    if (list.length) {
    } else {
      fetch();
    }
  }, []);

  return list;
};

export default useSelectListDepartment;
