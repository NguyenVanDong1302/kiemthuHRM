import { string } from "yup";
import ConfirmDialog from "./Confirm";
import Popup from "./Popup";
import Error from "./Error";


const ShowPopup = ({ size, body, title, footer, custom }: { size?: string, body?: any, title?: any, custom?: any, footer?: any }) => {
    return Popup({ size: size, body: body, custom: custom, title: title, footer: footer });
}

const Confirm = ({ title, message, yes }: { title?: string, message?: string, yes?: any }) => {
    return ConfirmDialog({ title: title, message: message, yes: yes });
}

const ShowError = (error: any, localizer?: any) => {
    return Error(error, localizer);
}

export { ShowError, ShowPopup, Confirm }