import React, { useState } from "react";
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
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setAccount } from "../../redux/features/accountSlice";
import accountApi from "../../api/modules/account.api";

const roles = [
  {
    label: "Sinh viên",
    value: "student",
  },
  {
    label: "Nhà tuyển dụng",
    value: "recruitment",
  },
];

const RegisterForm = () => {
  const registerForm = useFormik({
    initialValues: {
      name: "",
      gmail: "",
      phone: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "Họ và tên tối thiểu 4 ký tự ")
        .required("Bạn phải nhập tên"),
      gmail: Yup.string()
        .matches(
          /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g,
          "Gmail không hợp lệ"
        )
        .required("Bạn phải nhập Gmail"),
      phone: Yup.string()
        .min(10, "Số điện thoại không hợp lệ")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Số điện thoại không hợp lệ"
        )
        .required("Bạn phải nhập số điện thoại"),
      password: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự ")
        .required("Bạn phải nhập mật khẩu"),
      role: Yup.string().required("Bạn phải chọn kiểu thành viên"),
    }),
    onSubmit: async (values) => {
      // console.log({ ...values, role });
      try {
        const respone = await accountApi.register({ ...values });
        if (respone.response.status === 201) {
          navigate("/");
          dispath(setAccount(respone.response.data));
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const theme = useTheme();
  const [isRegisterRequest, setisRegisterRequest] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // console.log(role);
  console.log(registerForm.errors);
  return (
    <Box component="form" onSubmit={registerForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Nhập họ và tên"
          name="name"
          fullWidth
          value={registerForm.values.name}
          onChange={registerForm.handleChange}
          color="success"
          error={
            registerForm.touched.name && registerForm.errors.name !== undefined
          }
          helperText={registerForm.touched.name && registerForm.errors.name}
        />
        <TextField
          type="text"
          placeholder="Nhập gmail"
          name="gmail"
          fullWidth
          value={registerForm.values.gmail}
          onChange={registerForm.handleChange}
          color="success"
          error={
            registerForm.touched.gmail &&
            registerForm.errors.gmail !== undefined
          }
          helperText={registerForm.touched.gmail && registerForm.errors.gmail}
        />
        <TextField
          type="text"
          placeholder="Nhập số điện thoại"
          name="phone"
          fullWidth
          value={registerForm.values.phone}
          onChange={registerForm.handleChange}
          color="success"
          error={
            registerForm.touched.phone &&
            registerForm.errors.phone !== undefined
          }
          helperText={registerForm.touched.phone && registerForm.errors.phone}
        />
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            fullWidth
            placeholder="Nhập mật khẩu"
            color="success"
            type={showPassword ? "text" : "password"}
            value={registerForm.values.password}
            onChange={(e) => {
              registerForm.setFieldValue("password", e.target.value);
            }}
            error={
              registerForm.touched.password &&
              registerForm.errors.password !== undefined
            }
            // helperText={
            //   registerForm.touched.password && registerForm.errors.password
            // }
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
            {registerForm.touched.password && registerForm.errors.password}
          </p>
        </FormControl>
        <Box>
          <Typography
            sx={{ fontWeight: 500, fontSize: "1rem", marginBottom: "12px" }}
          >
            Bạn là ai?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              span: {
                display: "block",
                textAlign: "center",
                margin: "0 4px",
                width: "140px",
                padding: "8px 0",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: "#f8f8f8",
              },
            }}
          >
            {roles.map((item) => {
              return (
                <span
                  key={item.value}
                  style={
                    item.value === registerForm.values.role
                      ? { border: "1px solid #fcaf17", backgroundColor: "#fff" }
                      : {}
                  }
                  onClick={() => {
                    registerForm.setFieldValue("role", item.value);
                  }}
                >
                  {item.label}
                </span>
              );
            })}
          </Box>
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root"
            style={{ textAlign: "center" }}
          >
            {registerForm.touched.role && registerForm.errors.role}
          </p>
        </Box>

        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          loading={isRegisterRequest}
          sx={{
            marginTop: 4,
            color: theme.palette.secondary.contrastText,
            fontWeight: "700",
            "&:hover": { backgroundColor: theme.palette.primary.main },
          }}
        >
          Đăng ký
        </LoadingButton>
        <Button
          component={Link}
          to="/dangnhap"
          fullWidth
          sx={{
            marginTop: 1,
            fontWeight: "600",
            "&:hover": { backgroundColor: "rgba(255, 195, 0, 0.2)" },
          }}
          onClick={() => {}}
        >
          Đăng nhập
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
