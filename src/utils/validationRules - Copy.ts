import {  Schema } from "rsuite";
import { AnySchema } from "yup";
import { useLocalization } from "hooks/useLocalization";

const _l = useLocalization('ErrorCommon');
// export const nameRule = Schema.Types.StringType()
//     .addRule((value: string, data: any) => {
//         return value.indexOf('A')==0?true:false;
//     }, 'Duplicate username');
export const requiredRule = Schema.Types.StringType()
    // .addRule((value: string, data: any)=>{
    //     debugger;
    //     alert(value);
    //     console.log('value', value);
    //     console.log('data', data);
    //     return false;
    // }, '')
    .isRequired(_l('This field is required'));
export const requiredOrgRule = Schema.Types.NumberType()
    .addRule((value: any, data: any)=>{
        let kq = value == -1;
        return !kq;
    }, _l('This field is required'))
    .isRequired(_l('This field is required'));
export const emailRule = Schema.Types.StringType()
    .isEmail(_l('Please enter a valid email address'));
export const emailRequiredRule = Schema.Types.StringType()
    // .addRule((value: string, data: any)=>{
    //     return (value && value != '') ? true : false;
    // }, 'This field is required.')
    .isRequired(_l('This field is required'))
    .isEmail(_l('Please enter a valid email address'));
