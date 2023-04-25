import { text } from "body-parser";
import React from "react";
import { FormControlProps, FormControl, InputGroup } from "react-bootstrap";
import { AppInputProps } from "./AppInputProp";
import { Input } from "rsuite";

const AppTextarea = ({
  iconLeft,
  iconRight,
  textLeft,
  textRight,
  type,
  size,
  className,

  ...otherProps
}: AppInputProps) => {
  let leftTemplate, rightTemplate;

  if (iconLeft) {
    leftTemplate = (
      <div className="input-group-prepend">
        <InputGroup.Text>
          <i className={`${iconLeft}`} />
        </InputGroup.Text>
      </div>
    );
  } else if (textLeft) {
    leftTemplate = (
      <div className="input-group-prepend">
        <InputGroup.Text>{textLeft}</InputGroup.Text>
      </div>
    );
  }

  if (iconRight) {
    rightTemplate = (
      <div className="input-group-append">
        <InputGroup.Text>
          <i className={`${iconRight}`} />
        </InputGroup.Text>
      </div>
    );
  } else if (textRight) {
    rightTemplate = (
      <div className="input-group-append">
        <InputGroup.Text>{textRight}</InputGroup.Text>
      </div>
    );
  }
  if (!type) type = "text";
  if (iconLeft || iconRight || textLeft || textRight) {
    return (
      <InputGroup size={size} className={className}>
        {leftTemplate}
        <FormControl {...otherProps} as="textarea" />
        {rightTemplate}
      </InputGroup>
    );
  }

  return (
    <FormControl
      {...otherProps}
      size={size}
      className={className}
      as="textarea"
    />
  );
};

export default AppTextarea;

export const Textarea = React.forwardRef((props: any, ref: any) => (
  <Input {...props} as="textarea" ref={ref} />
));
