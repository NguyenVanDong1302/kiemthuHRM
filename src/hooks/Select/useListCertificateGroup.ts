import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import Mst_CertificateGroup_service from "services/Staff/Mst_CertificateGroup_service";

const useListCertificateGroup = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp: any = await Mst_CertificateGroup_service.GetAllActive();

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

export default useListCertificateGroup;
