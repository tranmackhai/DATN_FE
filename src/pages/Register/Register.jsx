import React from "react";
import RegisterForm from "../../components/common/RegisterForm";
import { Box } from "@mui/material";

const Register = () => {
  return (
    <section className="register">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          // backgroundImage: `url("${"https://academics.siu.edu/computing-and-technology/_common/images/itec/itec-index-banner.jpg"}")`,
        }}
      >
        <Box
          sx={{
            margin: "64px 0",
            backgroundColor: "#fff",
            textAlign: "center",
            width: "100%",
            maxWidth: "600px",
            padding: 10,
            borderRadius: "4px",
            outline: "none",
            boxShadow: "rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px",
          }}
        >
          <RegisterForm />
        </Box>
      </Box>
    </section>
  );
};

export default Register;
