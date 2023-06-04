import { useTheme } from "@emotion/react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import accountApi from "../../../../api/modules/account.api";

const ChangePassword = () => {
  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự ")
        .required("Nhập mật khẩu"),
      newPassword: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự ")
        .required("Nhập mật khẩu mới"),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Mật khẩu không chính xác"
      ),
    }),

    onSubmit: async (values) => {
      console.log({ ...values });
      try {
        const respone = await accountApi.updatePassword({ ...values });
        if (respone.response.status === 200) {
          toast.success("Đổi mật khẩu thành công");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState([false, false, false]);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleReset = () => {
    changePasswordForm.resetForm({
      password: "",
      newPassword: "",
      newCofirmPassword: "",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={changePasswordForm.handleSubmit}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        padding: "20px",
        height: "516px",
      }}
    >
      <ToastContainer />
      <Stack spacing={1}>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password-1"
            fullWidth
            placeholder="Nhập mật khẩu hiện tại"
            color="success"
            type={showPassword[0] ? "text" : "password"}
            value={changePasswordForm.values.password}
            onChange={(e) => {
              changePasswordForm.setFieldValue("password", e.target.value);
            }}
            error={
              changePasswordForm.touched.password &&
              changePasswordForm.errors.password !== undefined
            }
            // helperText={
            //   changePasswordForm.touched.password &&
            //   changePasswordForm.errors.password
            // }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword([
                      !showPassword[0],
                      showPassword[1],
                      showPassword[2],
                    ]);
                  }}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword[0] ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root">
            {changePasswordForm.touched.password &&
              changePasswordForm.errors.password}
          </p>
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password-2"
            fullWidth
            placeholder="Nhập mật khẩu mới"
            color="success"
            type={showPassword[1] ? "text" : "password"}
            value={changePasswordForm.values.newPassword}
            onChange={(e) => {
              changePasswordForm.setFieldValue("newPassword", e.target.value);
            }}
            error={
              changePasswordForm.touched.newPassword &&
              changePasswordForm.errors.newPassword !== undefined
            }
            // helperText={
            //   changePasswordForm.touched.newPassword &&
            //   changePasswordForm.errors.newPassword
            // }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword([
                      showPassword[0],
                      !showPassword[1],
                      showPassword[2],
                    ]);
                  }}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword[1] ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root">
            {changePasswordForm.touched.newPassword &&
              changePasswordForm.errors.newPassword}
          </p>
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password-3"
            fullWidth
            placeholder="Nhập lại mật khẩu mới"
            color="success"
            type={showPassword[2] ? "text" : "password"}
            value={changePasswordForm.values.confirmNewPassword}
            onChange={(e) => {
              changePasswordForm.setFieldValue(
                "confirmNewPassword",
                e.target.value
              );
            }}
            error={
              changePasswordForm.touched.confirmNewPassword &&
              changePasswordForm.errors.confirmNewPassword !== undefined
            }
            // helperText={
            //   changePasswordForm.touched.confirmNewPassword &&
            //   changePasswordForm.errors.confirmNewPassword
            // }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword([
                      showPassword[0],
                      showPassword[1],
                      !showPassword[2],
                    ]);
                  }}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword[2] ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root">
            {changePasswordForm.touched.confirmNewPassword &&
              changePasswordForm.errors.confirmNewPassword}
          </p>
        </FormControl>
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{
            marginTop: 4,
            color: theme.palette.secondary.contrastText,
            fontWeight: "700",
            "&:hover": { backgroundColor: theme.palette.primary.main },
          }}
        >
          Xác nhận
        </LoadingButton>
        <Button
          fullWidth
          sx={{
            marginTop: 1,
            fontWeight: "600",
            "&:hover": { backgroundColor: "rgba(255, 195, 0, 0.2)" },
          }}
          onClick={() => {
            handleReset();
          }}
        >
          Huỷ
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePassword;
