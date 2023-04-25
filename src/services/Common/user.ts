import * as api from "./../helper";

const getByUserId = async (UserID: string) => {
  return await api.post("Staff_Staff/GetByUserID", {
    UserID,
  });
};

const getCurrentUser = async () => {
  return await api.post("api/GetCurrentUser", {});
};

export default {
  getByUserId,
  getCurrentUser,
}