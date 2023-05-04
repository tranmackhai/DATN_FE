import React from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextFieald } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import studentApi from "../../api/modules/student.api";
import * as Yup from "yup";

const LoginForm = () => {
  const dispath = useDispatch();
  const [isLoginRequest, setisLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const loginForm = useFormik({
    initialValues: {
      password: "",
      gmail: "",
    },
    validationSchema: Yup.object({
      gmail: Yup.string()
        .min(12, "Gmail tối thiểu 12 ký tự ")
        .required("Gmail là bắt buộc"),
      password: Yup.string()
        .min(8, "Password tối thiểu 8 ký tự ")
        .required("Password là bắt buộc"),
    }),
    onSubmit: async (values) => {
      const respone = await studentApi.login(values);
      console.log(respone);
    },
  });

  return <div>LoginForm</div>;
};

export default LoginForm;
