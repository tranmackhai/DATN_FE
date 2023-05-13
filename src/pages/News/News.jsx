import React from "react";
import { news } from "../../api/modules/news.api";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const News = () => {
  const theme = useTheme();
  return (
    <section className="news">
      <Box>
        {news.map((item) => {
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
              <Link to={`/tintuc/${item.slug}`}>
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

export default News;
