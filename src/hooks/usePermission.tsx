import { useSelector } from 'react-redux';
export const usePermission = () => {
    let permissions = useSelector((state: any) => state.auth.permissions);
    const hasPermission = (str: any) => {
        if (!str || str == '') return true;

        if (!permissions || permissions.length == 0) return false;

        var arr = str.split(',');

        if (permissions.some((p: any) => arr.some((a: any) => a.trim() === p))) return true;
        return false;

    };

    return hasPermission;
};
