import React from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import newsApi from "../../api/modules/news.api";
import moment from "moment";
import Search from "../../components/common/Search";

const News = () => {
  const theme = useTheme();
  const [news, setNews] = useState({ rows: [], count: 0 });

  const navigate = useNavigate();
  const [query] = useSearchParams();
  const p = query.get("p") || 1;
  const q = query.get("q") || "";
  const handlePageChange = (page) => {
    navigate(`?p=${page}`);
  };

  const handleSearch = (keyword) => {
    navigate(`?p=${p}&q=${keyword}`);
  };

  useEffect(() => {
    (async () => {
      const params = {
        type: "news",
        limit: 5,
        p: p,
      };
      try {
        // const res = await newsApi.getAll({
        //   type: "news",
        //   isActive: true,
        //   limit: 5,
        //   p: p,
        // });
        // if (res.status === 200) {
        //   setNews(res.data);
        // }
        if (q === "") {
          const response = await newsApi.getAll(params);
          setNews(response.data);
        } else {
          const response = await newsApi.search({ ...params, q: q });
          setNews(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [p, q]);
  return (
    <section className="news">
      <Search onSearch={handleSearch} />
      <Box>
        {news?.rows.map((item) => {
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
                  <span>{moment(item.createdAt).format("DD/MM/YYYY")}</span>
                </Box>
              </Link>
            </Box>
          );
        })}
        {news.count > 0 && (
          <Pagination
            count={Math.ceil(news.count / 5)}
            shape="rounded"
            onChange={(e, page) => {
              handlePageChange(page);
            }}
            sx={{
              ul: { justifyContent: "center" },
            }}
          />
        )}
      </Box>
    </section>
  );
};

export default News;
