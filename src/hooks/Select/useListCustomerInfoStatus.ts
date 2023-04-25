import { useLocalization } from "hooks/useLocalization";

export const useListCustomerInfoStatus = () => {
  const _l = useLocalization("CustomerInfoStatus");
  return ["PENDING", "APPROVED", "REJECTED", "CHECKEDIN", "CHECKEDOUT"].map(
    (item: any) => {
      return {
        label: _l(item),
        value: item,
      };
    }
  );
};
