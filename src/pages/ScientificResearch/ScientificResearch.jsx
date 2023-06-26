import React from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import newsApi from "../../api/modules/news.api";
import moment from "moment";
import Search from "../../components/common/Search";

const ScientificResearch = () => {
  const theme = useTheme();
  const [scientificResearch, setScientificResearch] = useState({
    rows: [],
    count: 0,
  });

  const navigate = useNavigate();
  const [query] = useSearchParams();
  const p = query.get("p") || 1;
  const q = query.get("q") || "";

  const handlePageChange = (page) => {
    navigate(`?p=${page}`);
  };

  const handleSearch = async (keyword) => {
    // console.log(keyword);
    navigate(`?p=${p}&q=${keyword}`);
  };

  useEffect(() => {
    (async () => {
      const params = {
        type: "scientificResearch",
        p: p,
        limit: 5,
      };
      try {
        // const res = await newsApi.getAll();
        // if (res.status === 200) {
        //   setScientificResearch(res.data);
        // }
        if (q === "") {
          const response = await newsApi.getAll(params);
          setScientificResearch(response.data);
        } else {
          const response = await newsApi.search({ ...params, q: q });
          setScientificResearch(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [p]);
  return (
    <section className="scientific-research">
      <Search onSearch={handleSearch} />
      <Box>
        {scientificResearch?.rows.map((item) => {
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
              <Link to={`/nckh/${item.slug}`}>
                <img
                  src={item.thumbnail}
                  style={{ width: "120px", height: "60px", objectFit: "cover" }}
                />
                <Box display="block" marginLeft="12px">
                  <Typography
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
        {scientificResearch.count > 0 && (
          <Pagination
            count={Math.ceil(scientificResearch.count / 5)}
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

export default ScientificResearch;
