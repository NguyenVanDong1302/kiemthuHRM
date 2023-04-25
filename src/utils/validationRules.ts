import { Schema } from "rsuite";
import { AnySchema } from "yup";

export const numberRequiredRule = Schema.Types.NumberType()
    .isRequired('This field is required');
export const dateRequiredRule = Schema.Types.DateType()
    .isRequired('This field is required');
export const requiredRule = Schema.Types.StringType()
    .isRequired('This field is required');
export const orgRequiredRule = Schema.Types.NumberType()
    .addRule((value: any, data: any) => {
        let kq = value == -1;
        return !kq;
    }, 'This field is required')
    .isRequired('This field is required');
export const emailRule = Schema.Types.StringType()
    .isEmail('Please enter a valid email address');
export const emailRequiredRule = Schema.Types.StringType()
    .isRequired('This field is required')
    .isEmail('Please enter a valid email address');

export const requiredRuleCustom = (text: string) => Schema.Types.StringType()
    .isRequired(`${text}`);

export const requiredDateRuleCustom = (text: string) => Schema.Types.DateType()
    .isRequired(`${text}`);

export const requiredNumberRuleCustom = (text: string) => Schema.Types.NumberType()
    .isRequired(`${text}`);