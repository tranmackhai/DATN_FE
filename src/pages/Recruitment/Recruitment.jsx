import { useTheme } from "@emotion/react";
import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import newsApi from "../../api/modules/news.api";
import moment from "moment";

const Recruitment = () => {
  const theme = useTheme();
  const [data, setData] = useState({ rows: [], count: 0 });
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const p = query.get("p") || 1;
  const handlePageChange = (page) => {
    navigate(`?p=${page}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newsApi.getAll({
          type: "recruitment",
          isActive: true,
          limit: 5,
          p: p,
        });
        setData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, [p]);

  return (
    <section className="recruitment">
      <Box>
        {data.rows.map((item) => {
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
        {data.count > 0 && (
          <Pagination
            count={Math.ceil(data.count / 5)}
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

export default Recruitment;
