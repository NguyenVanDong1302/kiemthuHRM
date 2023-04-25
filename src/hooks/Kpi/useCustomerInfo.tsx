import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import Inout_CustomerInfo_service from "services/Kpi/Inout_CustomerInfo_service";

export const useCustomerInfo = (CustomerInfoID: any) => {
  const [info, setInfo] = useState<any>(null);

  const fetch = async () => {
    const resp: any = await Inout_CustomerInfo_service.GetByCustomerInfoID(
      CustomerInfoID
    );

    if (resp.Success) {
      if (resp.Data && resp.Data.InOut_CustomerInfo) {
        setInfo(resp.Data.InOut_CustomerInfo);
      }
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return info;
};
