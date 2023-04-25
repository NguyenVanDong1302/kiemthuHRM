import { useEffect, useState } from "react";
import Sys_user_service from "services/Admin/Sys_user_service";

export interface UserType {
  UserCode: string;
  NetworkID: string | any;
  UserName: string;
  UserPassword: string;
  UserPasswordNew: string | any;
  PhoneNo: string;
  EMail: string;
  MST: string;
  OrganCode: string | any;
  DepartmentCode: string | any;
  Position: string;
  VerificationCode: string | any;
  Avatar: string | any;
  UUID: string | any;
  FlagDLAdmin: string;
  FlagSysAdmin: string;
  FlagNNTAdmin: string;
  OrgID: string | any;
  CustomerCodeSys: string | any;
  CustomerCode: string | any;
  CustomerName: string | any;
  FlagActive: string;
  LogLUDTimeUTC: string | any;
  LogLUBy: string | any;
  ACId: string;
  ACAvatar: string;
  ACEmail: string;
  ACLanguage: string;
  ACName: string;
  ACPhone: string;
  ACTimeZone: string;
  mo_OrganCode: string | any;
  mo_OrganName: string | any;
  mdept_DepartmentCode: string | any;
  mdept_DepartmentName: string | any;
  mnnt_DealerType: string | any;
  ctitctg_CustomerGrpCode: string | any;
}

export const useSelectListUser = () => {
  const [list, setList] = useState<UserType[]>([]);

  const fetch = async () => {
    const resp: any = await Sys_user_service.GetAllActive();

    if (resp.Success) {
      setList(resp.Data && resp.Data);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return list;
};
