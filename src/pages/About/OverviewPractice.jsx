import { Box, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Overview = ({
  flexDirection,
  background,
  title,
  content1,
  content2,
  content3,
  image,
}) => {
  return (
    <section className="overview">
      <Box
        sx={{
          backgroundColor: background,
        }}
      >
        <Container disableGutters={true} maxWidth="lg">
          <Box
            display="flex"
            alignItems="center"
            padding="48px 0"
            flexDirection={flexDirection}
            justifyContent="space-around"
          >
            <Box>
              <img
                src={image}
                style={{
                  width: "400px",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                textTransform="uppercase"
                variant="h5"
                paddingBottom="24px"
                fontWeight="500"
              >
                {title}
              </Typography>
              <Typography>{content1}</Typography>
              <Typography>{content2}</Typography>
              <Typography>{content3}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default Overview;
