import React from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import accountApi from "../../api/modules/account.api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const LoginForm = () => {
  const theme = useTheme();
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
        .min(8, "Mật khẩu tối thiểu 8 ký tự ")
        .required("Mật khẩu là bắt buộc"),
    }),
    onSubmit: async (values) => {
      const respone = await accountApi.login(values);
      console.log(respone);
    },
  });

  // console.log(loginForm.values)
  console.log(loginForm.errors);
  return (
    <Box component="form" onSubmit={loginForm.handleSubmit}>
      <Stack spacing={4}>
        <TextField
          type="text"
          placeholder="Nhập gmail của bạn"
          name="gmail"
          fullWidth
          value={loginForm.values.gmail}
          onChange={loginForm.handleChange}
          color="success"
          error={
            loginForm.touched.gmail && loginForm.errors.gmail !== undefined
          }
          helperText={loginForm.touched.gmail && loginForm.errors.gmail}
        />
        <TextField
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          name="password"
          fullWidth
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          color="success"
          error={
            loginForm.touched.password &&
            loginForm.errors.password !== undefined
          }
          helperText={loginForm.touched.password && loginForm.errors.password}
        />
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          loading={isLoginRequest}
          sx={{
            marginTop: 4,
            color: theme.palette.primary.contrastText,
            fontWeight: "700",
            "&:hover": { backgroundColor: theme.palette.primary.main },
          }}
        >
          Đăng nhập
        </LoadingButton>
        <Button
          component={Link}
          to="/dangky"
          fullWidth
          sx={{
            marginTop: 1,
            fontWeight: "600",
            "&:hover": { backgroundColor: "rgba(255, 195, 0, 0.2)" },
          }}
          onClick={() => {}}
        >
          Đăng ký
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
