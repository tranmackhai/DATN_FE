import { Box, Typography } from "@mui/material";
import React from "react";

const TitlePersonnel = ({ title }) => {
  return (
    <Box
      textTransform="uppercase"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      margin="24px 0"
    >
      <b
        style={{
          display: "block",
          flex: "1",
          height: "2px",
          opacity: ".1",
          backgroundColor: "#555555",
        }}
      ></b>
      <Typography
        variant="h6"
        fontWeight={600}
        textTransform="uppercase"
        padding="0 24px"
      >
        {title}
      </Typography>
      <b
        style={{
          display: "block",
          flex: "1",
          height: "2px",
          opacity: ".1",
          backgroundColor: "#555555",
        }}
      ></b>
    </Box>
  );
};

export default TitlePersonnel;
