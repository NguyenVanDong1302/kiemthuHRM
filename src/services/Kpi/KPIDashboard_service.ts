import * as api from "./../helper";

const KPIDashboard = async ({ OrgID, DashBoardDate }: any) => {
  return await api.post("Report/KPIDashboard", {
    OrgID: OrgID,
    DashBoardDate: DashBoardDate,
  });
};

export default {
  KPIDashboard,
};
