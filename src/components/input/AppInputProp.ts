import { FormControlProps } from 'react-bootstrap';
export interface AppInputProps extends FormControlProps {
    iconLeft?: string;
    iconRight?: string;
    textLeft?: string;
    textRight?: string;
    name?:string;
    onvalueChanged?:any;
}