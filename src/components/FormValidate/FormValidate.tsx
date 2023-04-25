import { FC, forwardRef, memo, useEffect } from "react";
import { Form, Row } from "rsuite";
import { FormItemInterface, FormValidateInterface } from "../interface";
import FormItem from "./FormItem/FormItem";
import { FormValidateContainer } from "./style";
const FormValidate: FC<FormValidateInterface> = forwardRef(
  (
    {
      className,
      formValue,
      setFormValue,
      style,
      listItem,
      model,
      layout,
      ...props
    }: FormValidateInterface,
    ref: any
  ) => {
    useEffect(() => {
      const plaintextValue = document.querySelectorAll(
        ".rs-plaintext.rs-plaintext-empty"
      );

      const plaintextTextAreaValue = document.querySelectorAll(
        ".rs-plaintext.rs-plaintext-empty"
      );

      plaintextValue.forEach((item: any) => {
        item.innerHTML = "---";
      });

      plaintextTextAreaValue.forEach((item: any) => {
        item.innerHTML = "---";
      });
    }, []);

    return (
      <FormValidateContainer>
        <Form
          autoComplete={props.autocomplete === "off" ? "off" : "off"}
          ref={ref}
          formValue={formValue}
          onChange={setFormValue}
          fluid
          model={model}
          layout={layout}
          className={`form-validate ${className ? className : ""}`}
          style={style}
        >
          <Row
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {listItem.map((item: FormItemInterface, index: number) => {
              return (
                <FormItem key={`form-validate-item-${index}`} item={item} />
              );
            })}
          </Row>
        </Form>
      </FormValidateContainer>
    );
  }
);

export default memo(FormValidate);
