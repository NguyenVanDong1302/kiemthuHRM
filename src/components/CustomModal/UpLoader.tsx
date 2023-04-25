import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { ShowError } from "components/Dialogs/Dialogs";
import { ReactNode } from "react";
import Doc from "../../../public/format-icon/docx.png";
import Gif from "../../../public/format-icon/gif.png";
import Jpg from "../../../public/format-icon/jpg.png";
import Png from "../../../public/format-icon/png.png";
import Pdf from "../../../public/format-icon/pdf.png";
import Rar from "../../../public/format-icon/rar.png";
import Xlss from "../../../public/format-icon/xlsx.png";
import Txt from "../../../public/format-icon/txt.png";
import Xml from "../../../public/format-icon/xml.png";
import Zip from "../../../public/format-icon/zip.png";
import { formatBytes } from "utils/common";
import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setListDataUpload } from "store/reducers/selectApi";

export interface FileTypeCustom {
  name?: string;
  /** File unique identifier */
  fileKey?: number | string;

  /** File upload status */
  status?: "inited" | "uploading" | "error" | "finished";
  /** File upload status */
  progress?: number;

  /** The url of the file can be previewed. */
  url?: string;
  uuid?: string;
  blobFile?: any;

  AttFileId?: string;
  FileName?: string;
  FilePath?: string;
  FileSize?: number;
  FlagFileUpload?: string;
  Url?: string;
}

export const handleShouldUpdate = (
  fileList: FileTypeCustom[], // số lượng phân tử của file
  newFile: FileTypeCustom[] | FileTypeCustom, // file mới up lên
  fileType: string[], // loại file giá trị truyền vào
  allowOneFile?: boolean, // trong trường hợp chỉ được upload 1 file duy nhất
  max?: number // giá trị dung lượng file lớn nhất có thể chứa
) => {
  let newArr = allowOneFile ? [fileList[fileList.length - 1]] : fileList;

  const listFile = [...newArr].map((item: any) => {
    return item.name ? item.name : item.FileName;
  });
  const lower = fileType.map((item: string) => item.toLowerCase());
  const maxSize = [...newArr].reduce((total: number, item: any) => {
    return total + item?.blobFile?.size
      ? item.blobFile.size
      : parseFloat(item.FileSize);
  }, 0);

  const isFind = listFile.every((item: any) => {
    const lastItem = item.split(".").slice(-1)[0].toLowerCase();
    return lower.includes(lastItem);
  });

  if (max) {
    if (maxSize > max) {
      if (
        // eslint-disable-next-line no-restricted-globals
        confirm(
          "The size exceeds the allowable limit. Do you want to continue uploading ?"
        )
      ) {
        if (isFind) {
          return true;
        } else {
          toast.error("Wrong file format !");
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (isFind) {
        return true;
      } else {
        toast.error("Wrong file format !");
        return false;
      }
    }
  } else {
    if (isFind) {
      return true;
    } else {
      toast.error("Wrong file format !");
      return false;
    }
  }
};

export const handleRemove = (file: FileTypeCustom, setList: any) => {
  if (file.Url) {
    setList((p: any) => {
      return p.filter((item: any) => {
        return item.Url !== file.Url;
      });
    });
  }
};

export const handleSuccess = (response: any, setListFile: any) => {
  if (response.Success) {
    toast.success("Upload File Success");
    setListFile((p: any) => {
      return [
        ...p,
        {
          ...response.Data,
          uuid: uuidv4(),
        },
      ];
    });
  } else {
    ShowError(response.ErrorData);
  }
};

export const renderFileUploading = (
  file: FileTypeCustom,
  fileElement?: ReactNode,
  flagPop?: string
) => {
  const name = file?.FileName
    ? file.FileName
    : file?.blobFile?.name
      ? file?.blobFile?.name
      : "";
  let getLast = name.split(".").slice(-1)[0];
  let doc = "";
  switch (getLast.toLowerCase()) {
    case "docx":
      doc = Doc;
      break;
    case "pdf":
      doc = Pdf;
      break;
    case "xlsx":
      doc = Xlss;
      break;
    case "png":
      doc = Png;
      break;
    case "zip":
      doc = Zip;
      break;
    case "jpg":
      doc = Jpg;
      break;
    case "rar":
      doc = Rar;
      break;
    case "txt":
      doc = Txt;
      break;
    case "xml":
      doc = Xml;
      break;
    case "gif":
      doc = Gif;
      break;
    default:
      doc = "";
      break;
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      className={`list-file__item ${flagPop === "detail" ? "list-detail" : ""}`}
    >
      <div className="list-file__item-image">
        <img src={doc} alt="" style={{ width: "30px", height: "30px" }} />
      </div>
      <div className="list-file__item-content">
        <div className="d-flex align-items-flex-start flex-column justify-content-start">
          <h4>{name}</h4>

        </div>
      </div>
    </div>
  );
};