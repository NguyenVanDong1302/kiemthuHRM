import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { loginUser } from "store/reducers/auth";
import { Button, Textarea, Checkbox, Textbox, Col, Row } from "components/core";
import { setWindowClass, removeWindowClass } from "utils/common";

import * as Yup from "yup";

import { Form, InputGroup } from "react-bootstrap";
import * as AuthService from "services/auth_service";

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const token = await AuthService.login(email, password);

      dispatch(loginUser(token));
      toast.success("Login is succeed!");
      removeWindowClass("login-page");
      removeWindowClass("hold-transition");

      setAuthLoading(false);

      navigate("/");
    } catch (error: any) {
      setAuthLoading(false);
      toast.error(error.message || "Failed");
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .max(30, "Must be 30 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  setWindowClass("hold-transition login-page");

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>Admin</b>
            <span>LTE</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Sign in</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Textbox
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : (
                  <div className="input-group-append">
                    <InputGroup.Text>
                      <i className="fa fa-envelope" />
                    </InputGroup.Text>
                  </div>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <div className="input-group-append">
                    <InputGroup.Text>
                      <i className="fa fa-lock" />
                    </InputGroup.Text>
                  </div>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-8">
                <Checkbox type="icheck" checked={false}>
                  Remember me
                </Checkbox>
              </div>
              <div className="col-4">
                <Button type="submit" isLoading={isAuthLoading}>
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
