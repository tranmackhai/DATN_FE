import { Box, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Overview = ({
  flexDirection,
  background,
  title,
  content,
  buttonText,
  img,
  path,
}) => {
  const theme = useTheme();
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
            justifyContent="space-between"
            flexDirection={flexDirection}
          >
            <Box>
              <img
                src={img}
                style={{
                  width: "400px",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box
              width="50%"
              display="flex"
              flexDirection="column"
            >
              <Typography
                textTransform="uppercase"
                variant="h5"
                paddingBottom="24px"
                fontWeight="500"
              >
                {title}
              </Typography>
              <Typography>{content}</Typography>
              <Link
                to={path}
                style={{
                  marginTop: "24px",
                  padding: "12px",
                  width: "258px",
                  textAlign: "center",
                  fontWeight: "500",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                {buttonText}
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default Overview;
