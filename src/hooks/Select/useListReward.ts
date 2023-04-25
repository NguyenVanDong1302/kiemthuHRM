import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import staff_type_reward from "services/Staff/staff_type_reward_service";

const useListTypeReward = () => {
  const [list, setList] = useState<any>([]);

  const fetch = async () => {
    const resp = await staff_type_reward.getAllActive();
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

export default useListTypeReward;
