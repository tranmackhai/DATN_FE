import React from "react";
import { Box, Typography } from "@mui/material";
import { jobs } from "../../api/modules/jobs.api";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const Recruitment = () => {
  const theme = useTheme();
  return (
    <section className="recruitment">
      <Box>
        {jobs.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                border: "1px solid #dddddd",
                borderRadius: "4px",
                marginBottom: "24px",
                a: {
                  display: "flex",
                  padding: "12px 6px",
                  alignItems: "center",
                  color: "rgb(102 105 102 / 90%)",
                  span: {
                    fontSize: "0.8rem",
                    color: theme.palette.primary.contrastText,
                    fontWeight: "500",
                  },
                  "&:hover": {
                    color: "#000",
                  },
                },
              }}
            >
              <Link to={`/tuyendung/${item.slug}`}>
                <Box sx={{ width: "120px" }}>
                  <img
                    src={item.img}
                    style={{
                      width: "120px",
                      height: "60px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box display="block" marginLeft="12px">
                  <Typography
                    className="line_clamp"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <span>{item.createdAt}</span>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
    </section>
  );
};

export default Recruitment;
