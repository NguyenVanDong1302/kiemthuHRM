import { Link } from "react-router-dom";
import store from "store/store";
export default function NetworkLink({ to, children, ...params }: any) {
  const { NetworkId } = store.getState().orgInfo;

  return (
    <Link {...params} to={`/${NetworkId}${to}`}>
      {children}
    </Link>
  );
}
