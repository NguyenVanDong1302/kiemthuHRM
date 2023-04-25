import { NavLink } from "react-router-dom";
import store from "store/store";
export default function NavNetworkLink({ to, children, ...params }: any) {
  const { NetworkId } = store.getState().orgInfo;

  return (
    <NavLink {...params} to={`/${NetworkId}${to}`}>
      {children}
    </NavLink>
  );
}
