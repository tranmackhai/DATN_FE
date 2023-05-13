import React from "react";
import LoginFrom from "../../components/common/LoginForm";
import { Box } from "@mui/material";

const Login = () => {
  return (
    <section className="login">
      <Box sx={{ display: "flex", justifyContent: "center", backgroundColor: "#f5f5f5" }}>
        <Box
          sx={{
            margin: "64px 0",
            background: "#fff",
            textAlign: "center",
            width: "100%",
            maxWidth: "600px",
            padding: 10,
            borderRadius: "4px",
            outline: "none",
          }}
        >
          <LoginFrom />
        </Box>
      </Box>
    </section>
  );
};

export default Login;
