import { ReactNode } from "react";
import { UploaderProps } from "rsuite";

// interface tien anh
export interface MoreInterface {
  type?: string;
  label: string; // text hiển thị
  event?: any; // event của cái nút
  upload?: UploaderInterface; // trường hợp button import
  permission?: string; // quyền được xem của cái nút
}

export interface UploaderInterface extends UploaderProps {
  class?: string; // thêm class uploader
  event?: any; // sự kiện onClick của uploader
}

export interface FormItemInterface {
  label: string; // label của form item
  isHidden?: boolean; // cho phép cốt form item bị ẩn hay không
  required?: boolean; // thêm * màu đỏ cho label
  hideSeparate?: boolean; // ẩn - giữa các form item
  customControl?: ReactNode; // thay thế control
  control?: any[]; // các props ở trong form item
  Col?: number; // chia độ rộng của cột
  customerFormItem?: ReactNode; // thêm nội dung ở trong form control item
  customClass?: any; // thêm class cho form item
  customComponent?: ReactNode;
}

export interface FormValidateInterface {
  className?: string; // thêm class cho form
  style?: any; // thêm style cho form
  formValue: any; // formvalue truyền vào ( state )
  setFormValue: any; // sự kiện onChange của form ( state )
  ref: any; // ref của form
  listItem: FormItemInterface[]; // các phần từ trong form
  model?: any; // các rule ở trong form
  layout: "horizontal" | "vertical" | "inline"; // layout của form
  autocomplete?: string; // có cho phép đề xuất tự động hiện hay không
}

export interface UpdateInterface {
  data: any;
  isNew: boolean;
}

export interface SearchPropsDefault {
  OrgID?: string;
  KeyWord?: string;
  FlagActive?: string;
  Ft_PageIndex?: number;
  Ft_PageSize?: number;
  SortColumn?: string;
  SortBy?: string;
}

export interface ListSlide {
  SlideHeader?: ReactNode;
  title?: string;
  customClass?: string;
  icon?: ReactNode;
  listItem: FormItemInterface[];
}

export interface FormSlideBarInterface {
  listSlide: ListSlide[];
  className?: string;
  formValue: any;
  setFormValue: any;
  ref: any;
  model?: any;
  layout: "horizontal" | "vertical" | "inline";
  autocomplete?: string;
}
//
