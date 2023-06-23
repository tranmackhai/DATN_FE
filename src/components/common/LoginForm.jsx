import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import accountApi from "../../api/modules/account.api";
import { setAccount } from "../../redux/features/accountSlice";

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginRequest, setisLoginRequest] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [errorMessage, setErrorMessage] = useState();
  const loginForm = useFormik({
    initialValues: {
      password: "",
      gmail: "",
    },
    validationSchema: Yup.object({
      gmail: Yup.string()
        .min(8, "Gmail tối thiểu 8 ký tự ")
        .required("Gmail là bắt buộc"),
      password: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự ")
        .required("Mật khẩu là bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        const respone = await accountApi.login(values);
        // console.log(respone.response.status);
        if (respone.response.status === 201) {
          navigate("/");
          dispatch(setAccount(respone.response.data));
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data);
      }
    },
  });

  // console.log(loginForm.values)
  // console.log(loginForm.errors);
  // console.log()
  return (
    <Box component="form" onSubmit={loginForm.handleSubmit}>
      <Stack spacing={4}>
        <Typography
          variant="h4"
          fontWeight="700"
          textTransform="uppercase"
          color={theme.palette.primary.highlightText}
        >
          Đăng Nhập
        </Typography>
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
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            fullWidth
            placeholder="Nhập mật khẩu"
            color="success"
            type={showPassword ? "text" : "password"}
            value={loginForm.values.password}
            onChange={(e) => {
              loginForm.setFieldValue("password", e.target.value);
            }}
            error={
              loginForm.touched.password &&
              loginForm.errors.password !== undefined
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root">
            {loginForm.touched.password && loginForm.errors.password}
          </p>
        </FormControl>
        <Typography sx={{ fontSize: "0.9rem", color: "red" }}>
          {errorMessage}
        </Typography>
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          loading={isLoginRequest}
          sx={{
            marginTop: 4,
            color: "#fff",
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
