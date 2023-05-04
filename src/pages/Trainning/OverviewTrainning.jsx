import { useTheme } from "@emotion/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const OverviewTrainning = ({ bgrImg, left, title, content, path }) => {
  const theme = useTheme();
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: "550px",
          backgroundImage: `url(${bgrImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
          position: "relative",
          margin: "32px 0",
          backgroundColor: `rgb(255, 255, 255) !important`
        }}
      >
        <Box
          position="absolute"
          backgroundColor={theme.palette.primary.background}
          padding="36px"
          top="50%"
          left={left}
          sx={{
            height: "auto",
            borderRadius: "4px",
            transform: `translateY(-50%)`,
            maxWidth: "684px",
          }}
        >
          <Typography
            textTransform="uppercase"
            fontWeight="500"
            variant="h3"
            color={theme.palette.primary.contrastText}
          >
            {title}
          </Typography>
          <Typography
            color={theme.palette.primary.contrastText}
            padding="24px 0"
          >
            {content}
          </Typography>
          <Box
            sx={{
              ":hover a": {
                backgroundColor: `${theme.palette.secondary.main} !important`,
                color: `${theme.palette.secondary.contrastText} !important`,
              },
            }}
          >
            <Link
              to={path}
              style={{
                padding: "8px 16px",
                width: "258px",
                textAlign: "center",
                fontWeight: "500",
                backgroundColor: theme.palette.primary.background,
                color: theme.palette.primary.contrastText,
                border: "1px solid rgb(102 105 102 / 90%)",
                borderRadius: "4px",
              }}
            >
              Xem thêm
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default OverviewTrainning;
