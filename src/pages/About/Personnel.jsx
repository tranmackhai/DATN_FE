import React from "react";
import { Box, Container, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Personnel = ({ img, name, facebook, email }) => {
  const theme = useTheme();
  return (
    <section className="personnel">
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textTransform="uppercase"
          color="#555"
        >
          <Box>
            <img
              src={img}
              style={{ width: "248px", height: "248px", borderRadius: "50%" }}
            />
          </Box>
          <Box>
            <Typography fontWeight="700" margin="4px 0">
              {name}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: "12px",
              "a:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: `${theme.palette.secondary.contrastText} !important`,
              },
            }}
          >
            {facebook ? (
              <Tooltip title="Theo dõi trên Facebook">
                <Link
                  to={facebook}
                  style={{
                    color: theme.palette.primary.contrastText,
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    padding: "4px 6px",
                    border: "2px solid rgb(102 105 102 / 90%)",
                    borderRadius: "50%",
                    margin: "6px",
                  }}
                >
                  <i className="fa-brands fa-facebook"></i>
                </Link>
              </Tooltip>
            ) : (
              <></>
            )}
            {email ? (
              <Tooltip title="Gửi mail cho tôi">
                <Link
                  to={email}
                  style={{
                    color: theme.palette.primary.contrastText,
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    padding: "4px 6px",
                    border: "2px solid rgb(102 105 102 / 90%)",
                    borderRadius: "50%",
                  }}
                >
                  <i className="fa-regular fa-envelope"></i>
                </Link>
              </Tooltip>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Personnel;
