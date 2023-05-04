import React from "react";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box
      fontWeight="700"
      fontSize="1.7rem"
      textTransform="uppercase"
      display="flex"
      alignItems="center"
    >
      <img
        src="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682318111/IT_UTC2/Logo_Banner/319276402_573424818126346_7421643665744894014_n.jpg_xj4oc3.jpg"
        alt="#logo"
        style={{
          objectFit: "cover",
          width: 100,
          height: 100,
          marginRight: "12px",
          alignItems: "center",
          margin: "12px 0",
        }}
      />
    </Box>
  );
};

export default Logo;
