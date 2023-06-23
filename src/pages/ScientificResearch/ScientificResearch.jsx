import React from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import newsApi from "../../api/modules/news.api";
import moment from "moment";

const ScientificResearch = () => {
  const theme = useTheme();
  const [scientificResearch, setScientificResearch] = useState({
    rows: [],
    count: 0,
  });
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const p = query.get("p") || 1;
  const handlePageChange = (page) => {
    navigate(`?p=${page}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await newsApi.getAll({
          type: "scientificResearch",
          isActive: true,
          p: p,
          limit: 5,
        });
        if (res.status === 200) {
          setScientificResearch(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [p]);
  return (
    <section className="scientific-research">
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
