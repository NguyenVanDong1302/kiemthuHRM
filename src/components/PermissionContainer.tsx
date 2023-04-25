import { usePermission } from "hooks/usePermission";
import { ReactNode } from "react";

type Props = {
  permission: string;
  children: ReactNode;
};

export default function PermissionContainer({
  permission,
  children,
  ...params
}: Props) {
  const hasPermission = usePermission();
  return hasPermission(permission) ? <>{children} </> : <></>;
}
