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
          backgroundImage: `url("${"https://academics.siu.edu/computing-and-technology/_common/images/itec/itec-index-banner.jpg"}")`,
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
          }}
        >
          <RegisterForm />
        </Box>
      </Box>
    </section>
  );
};

export default Register;
