import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Link, Navigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const AuthForum = ({ children }) => {
  const user = useSelector((state) => state.account.account);
  const isFinish = useSelector((state) => state.account.isFinishGetProfile);
  if (isFinish && user) {
    return children;
  }
  if (!isFinish) {
    return <></>;
  }

  return <Navigate to="/dangnhap" />;
};

export default AuthForum;
