import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import staff_service from "services/Staff/staff_service";
import { Staff } from "store/reducers/Staff/Staff_Staff/Staff_Staff";
import { setListDataUpload } from "store/reducers/selectApi";
const useDetailStaff = (StaffCode: any) => {
  const dispatch = useDispatch()
  const [staff, setStaff] = useState<Staff>({
    Staff_Staff: {
      StaffCode: "",
      StaffCodeUser: "",
      OrgID: "",
      NetworkID: "",
      StaffLastName: "",
      StaffName: "",
      StaffFullName: "",
      StaffType: "",
      DepartmentCode: "",
      PositionCode: "",
      UserID: "",
      UserPassword: "",
      DBO: "",
      StaffPhone: "",
      StaffEmail: "",
      StaffAddress: "",
      WorkingStartDate: "",
      WorkingEndDate: "",
      ManagerStaff: "",
      StaffDesc: "",
      Remark: "",
      AvatarFilePath: "",
      AvatarUrl: "",
      AvatarFileBase64: "",
      AvatarFileName: "",
      Gender: "",
      BirthPlace: "",
      PermanentAddress: "",
      IDCardNumber: "",
      GovIDType: "",
      DateOfIssue: "",
      PlaceOfIssue: "",
      StaffStatus: "",
      FlagActive: "",
      FlagFileUpload: "",
      CreateDTime: "",
      CreateBy: "",
      LUDTime: "",
      LUBy: "",
      LogLUDTimeUTC: "",
      LogLUBy: "",
      MaritalStatus: "",
      MST: "",
      BankAccount: "",
      BankName: "",
      EthnicCode: "",
      ReligionCode: "",
      CountryCode: "",
      JsonDynamicField: "",
      DepartmentName: "",
      PositionName: "",
      StatusDesc: "",
      ReasonDesc: "",
      HistDate: "",
      BackDay: "",
      ReasonID: "",
      mg_GenderName: "",
      ms_StaffTypeName: "",
      mnnt_NNTFullName: "",
      mgit_GovIDTypeName: "",
      mc_CountryName: "",
      mrc_ReligionName: "",
      mec_EthnicName: "",
      ss_ManagerStaff: "",
      mrr_ResignReason: "",
    },
    Staff_MapDepartment: "",
    Staff_InfoDynamicField: "",
    FlagStaff: "",
    FlagContactInfo: "",
    FlagRelativeInfo: "",
    FlagOtherInfor: "",
  });

  const fetch = async () => {
    const resp = await staff_service.getByStaffCode(StaffCode);
    if (resp.Success) {
      if (resp.Data && resp.Data.Staff_Staff) {
        setStaff(resp.Data);
        dispatch(setListDataUpload({
          Url: resp.Data.Staff_Staff.AvatarUrl,
          FilePath: resp.Data.Staff_Staff.AvatarFilePath,
          FileName: resp.Data.Staff_Staff.AvatarFileName,
          FlagFileUpload: resp.Data.Staff_Staff.FlagFileUpload,
          AttFileId: resp.Data.Staff_Staff.AttFileId
        }));
      }
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    fetch();
  }, [StaffCode]);

  return staff;
};

export default useDetailStaff;
