import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import newsApi from "../../api/modules/news.api";
import moment from "moment";

const News = () => {
  const [news, setNews] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await newsApi.getAll({
          type: "news",
          p: 1,
          limit: 5,
        });
        if (res.status === 200) {
          setNews(res.data.rows);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const theme = useTheme();
  return (
    <section className="news">
      <Box>
        {news?.map((item) => {
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
                    src={item.thumbnail}
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
                  <span>{moment(item.createdAt).format("MM/DD/YYYY")}</span>
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
