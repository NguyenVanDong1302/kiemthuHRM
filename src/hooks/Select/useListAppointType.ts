import { useEffect, useState } from "react";
import Mst_AppointType_service from "services/Staff/Mst_AppointType_service";

interface AppointType {
  AppointTypeID: any;
  NetworkID: any;
  AppointTypeName: any;
  AppointTypeDesc: any;
  AppointGroup: any;
  FlagActive: any;
  LogLUDTimeUTC: any;
  LogLUBy: any;
}

export const useListAppointType = () => {
  const [list, setList] = useState<AppointType[]>([]);

  const fetch = async () => {
    const resp: any = await Mst_AppointType_service.getAllActive();

    if (resp.Success) {
      if (resp.Data) {
        setList(resp.Data);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return list;
};
