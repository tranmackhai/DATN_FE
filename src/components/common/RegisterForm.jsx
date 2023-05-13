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
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterForm = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={() => {}}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Nhập tên của bạn"
          name="name"
          fullWidth
          // value={}
          // onChange={}
          color="success"
          error={false}
          helperText={""}
        />
        <TextField
          type="text"
          placeholder="Nhập gmail của bạn"
          name="gmail"
          fullWidth
          // value={}
          // onChange={}
          color="success"
          error={true}
          helperText={""}
        />
        <TextField
          type="text"
          placeholder="Nhập số điện thoại của bạn"
          name="phone"
          fullWidth
          // value={}
          // onChange={}
          color="success"
          error={true}
          helperText={""}
        />
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            fullWidth="false"
            placeholder="Nhập mật khẩu của bạn"
            color="success"
            type={showPassword ? "text" : "password"}
            // value={}
            // onChange={loginForm.handleChange}
            // error={
            //   loginForm.touched.password &&
            //   loginForm.errors.password !== undefined
            // }
            // helperText={loginForm.touched.password && loginForm.errors.password}
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
        </FormControl>
        <Box
          sx={{
            span: {
              margin: "0 4px",
              textAlign: "center",
              input: {
                height: "40px",
                margin: "0",
                opacity: "0",
                outline: "none",
                padding: "0",
                // position: "absolute",
                "&:checked+label": {
                  background: "0 0",
                  border: "1px solid #fcaf17",
                },
              },
              label: {
                backgroundColor: "#f2f2f2",
                border: "1px solid #f2f2f2",
                borderRadius: "4px",
                color: "#6c757d",
                cursor: "pointer",
                fontSize: "1.1rem",
                padding: "8px 12px",
                overflow: "hidden",
                // position: "relative",
              },
            },
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: "1rem" }}>
            Bạn là gì?
          </Typography>
          <span>
            <input type="radio" id="radio-1" name="favorite" value="radio-1" />
            <label htmlFor="radio-1">Sinh viên</label>
          </span>
          <span>
            <input type="radio" id="radio-2" name="favorite" value="radio-2" />
            <label htmlFor="radio-2">Nhà tuyển dụng</label>
          </span>
        </Box>

        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          // loading={isLoginRequest}
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
          to="/dangky"
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
