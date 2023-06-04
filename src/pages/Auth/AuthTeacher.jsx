import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const AuthTeacher = ({ children }) => {
  const user = useSelector((state) => state.account.account);
  if (user && user.role === "teacher") {
    return children;
  }
  return (
    <Box textAlign="center">
      <Typography variant="h2" fontWeight={700}>
        PAGE NOT FOUND
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        404
      </Typography>
    </Box>
  );
};

export default AuthTeacher;