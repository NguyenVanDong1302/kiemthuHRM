import path from "path";
import { useLocation, useParams } from "react-router-dom";
import store from 'store/store';
export const useNetworkLocaltion = () => {
    let { networkId } = useParams();

    if (!networkId) networkId = "0";

    const localtion = useLocation();

    let pathName = localtion.pathname;
    if (pathName.startsWith(`/${networkId}`))
        pathName = pathName.substring(networkId.length + 1);

    const equalPath = (path: string) => {
        path = path.toLocaleLowerCase();

        let cpath = pathName.toLowerCase();

        var idx = path.indexOf("/:");
        if (idx > 0) {

            cpath = cpath.substring(0, idx);
            path = path.substring(0, idx);
            return cpath == path;

        }
        if (cpath == path) return true;

        if (path.endsWith('/') && cpath + '/' == path) return true;

        return false;

    };

    return { pathname: pathName, fullLocation: localtion, equalPath: equalPath };
};
