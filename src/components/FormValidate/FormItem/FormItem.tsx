import { FormItemInterface } from "components/interface";
import { FC } from "react";
import { Col, Form } from "rsuite";
import { FormItemContainer } from "./styled";

type Props = {
  item: FormItemInterface;
};

const FormItem: FC<Props> = ({ item }: Props) => {
  return (
    <Col
      xs={item.Col ? item.Col : 24}
      className={`${item?.isHidden ? "d-none" : ""} ${
        item?.customClass ? item.customClass : ""
      }`}
    >
      <FormItemContainer className="form-item-container">
        <Form.ControlLabel>
          {item.label}{" "}
          <span style={{ color: "red" }}>{item.required ? "*" : ""} </span>
        </Form.ControlLabel>
        {item?.customControl ? (
          <div className="form-item-container__control">
            {item.customControl}
          </div>
        ) : (
          <div className="form-item-container__control">
            {item?.control?.map((itemControl: any, indexControl: number) => {
              if (item?.control?.length) {
                return (
                  <Form.Group
                    controlId={`${itemControl.name}-${indexControl}`}
                    key={`form-control-${indexControl}`}
                    className={`${
                      itemControl.length > 1 ? "form-control-multiple" : ""
                    } ${itemControl.className ? itemControl.className : ""}`}
                  >
                    <div
                      className={`separate ${item?.hideSeparate ? "hide" : ""}`}
                    >
                      -
                    </div>
                    <Form.Control
                      {...itemControl}
                      className={itemControl.className ? "" : ""}
                      name={itemControl.name}
                    >
                      {itemControl.children}
                    </Form.Control>
                    {itemControl?.customerFormItem}
                  </Form.Group>
                );
              } else {
                return <></>;
              }
            })}
            {item?.customComponent ? (
              <div
                style={{ display: "block", width: "max-content", flex: "0" }}
              >
                {item?.customComponent}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </FormItemContainer>
    </Col>
  );
};

export default FormItem;
