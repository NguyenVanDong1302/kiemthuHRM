import { Button, Form, Nav, Sidenav } from "rsuite";
import { FormSlideBarContainer } from "./FormSlideBar_style";
import { v4 as uuid } from "uuid";
import { FC, forwardRef, memo, useEffect } from "react";
import {
  FormItemInterface,
  FormSlideBarInterface,
  ListSlide,
} from "components/interface";
import FormItem from "../FormItem/FormItem";

const FormSlideBar: FC<FormSlideBarInterface> = forwardRef(
  (
    {
      listSlide,
      className,
      formValue,
      setFormValue,
      model,
      layout,
      autocomplete,
      ...props
    }: FormSlideBarInterface,
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
      <FormSlideBarContainer className={className ? className : ""}>
        <Form
          autoComplete={autocomplete === "off" ? "off" : "off"}
          ref={ref}
          formValue={formValue}
          onChange={setFormValue}
          fluid
          model={model}
          layout={layout}
          className={`form-validate ${className ? className : ""}`}
        >
          {listSlide.map((item: ListSlide, index: number) => {
            if (item?.title) {
              return (
                <Sidenav
                  key={`form-sidenav-${index}`}
                  className={`${item?.customClass ? item.customClass : ""}`}
                >
                  <Sidenav.Header>{item?.SlideHeader}</Sidenav.Header>
                  <Sidenav.Body>
                    <Nav>
                      <Nav.Menu
                        title={item.title}
                        icon={item?.icon ? <div>{item.icon}</div> : <></>}
                      >
                        {item.listItem.map(
                          (itemForm: FormItemInterface, indexForm: number) => {
                            return (
                              <FormItem
                                key={`form-validate-item-${indexForm}`}
                                item={itemForm}
                              />
                            );
                          }
                        )}
                      </Nav.Menu>
                    </Nav>
                  </Sidenav.Body>
                </Sidenav>
              );
            } else {
              return item.listItem.map(
                (itemForm: FormItemInterface, indexForm: number) => {
                  return (
                    <FormItem key={`FormItem-${indexForm}`} item={itemForm} />
                  );
                }
              );
            }
          })}
        </Form>
      </FormSlideBarContainer>
    );
  }
);

export default memo(FormSlideBar);
