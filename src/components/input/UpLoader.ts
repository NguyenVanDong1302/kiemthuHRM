import { toast } from "react-toastify";
import { useLocalization } from 'hooks/useLocalization';

const _l = useLocalization("Uploader");

export interface FileType {
    /** File Name */
    name?: string;
    /** File unique identifier */
    fileKey?: number | string;
    /** File upload status */
    status?: "inited" | "uploading" | "error" | "finished";
    /** File upload status */
    progress?: number;
    /** The url of the file can be previewed. */
    url?: string;
    AttFileId?: string;
    FileName?: string;
    FilePath?: string;
    FileSize?: string;
    FlagFileUpload?: string;
    Url?: string;
    uuid?: string;
}

export const handleShouldUpdate = (
    fileList: FileType[],
    newFile: FileType[] | FileType,
    fileType: string[],
    max: number
) => {
    const listFile = [...fileList].map((item: any) => {
        return item.name ? item.name : item.FileName;
    });
    const lower = fileType.map((item: string) => item.toLowerCase());
    const maxSize = [...fileList].reduce((total: number, item: any) => {
        return total + item?.blobFile?.size
            ? item.blobFile.size
            : parseFloat(item.FileSize);
    }, 0);

    const isFind = listFile.every((item: any) => {
        const lastItem = item.split(".").slice(-1)[0].toLowerCase();
        return lower.includes(lastItem);
    });
    if (maxSize > max) {
        if (
            // eslint-disable-next-line no-restricted-globals
            confirm(
                _l(
                    "The size exceeds the allowable limit. Do you want to continue uploading ?"
                )
            )
        ) {
            if (isFind) {
                return true;
            } else {
                toast.error(_l("Wrong file format"));
                return false;
            }
        } else {
            return false;
        }
    } else {
        if (isFind) {
            return true;
        } else {
            toast.error(_l("Wrong file format"));
            return false;
        }
    }
};
export const handleRemove = () => {

}

export const handleSuccess = () => {

}

export const handleError = () => {

}