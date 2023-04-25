import { useEffect, useState } from "react";
import Mst_AppointGroup_service from "services/Staff/Mst_AppointGroup_service";

interface AppointGroup {
  AppointGroup: any;
  NetworkID: any;
  AppointGroupName: any;
  AppointGroupDesc: any;
  FlagActive: any;
  LogLUDTimeUTC: any;
  LogLUBy: any;
}

export const useListAppointGroup = () => {
  const [list, setList] = useState<AppointGroup[]>([]);

  const fetch = async () => {
    const resp: any = await Mst_AppointGroup_service.getAllActive();

    if (resp.Success) {
      setList(resp.Data && resp.Data);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return list;
};
