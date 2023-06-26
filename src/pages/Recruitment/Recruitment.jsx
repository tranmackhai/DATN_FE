import { useTheme } from "@emotion/react";
import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import newsApi from "../../api/modules/news.api";
import Search from "../../components/common/Search";
import moment from "moment";

const Recruitment = () => {
  const theme = useTheme();
  const [data, setData] = useState({ rows: [], count: 0 });
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
    const fetchData = async () => {
      const params = {
        type: "recruitment",
        limit: 5,
        p: p,
      };
      try {
        // const response = await newsApi.getAll({
        //   type: "recruitment",
        //   isActive: true,
        //   limit: 5,
        //   p: p,
        // });
        // setData(response.data);
        if (q === "") {
          const response = await newsApi.getAll(params);
          setData(response.data);
        } else {
          const response = await newsApi.search({ ...params, q: q });
          setData(response.data);
          console.log(response.data);
        }
      } catch (error) {}
    };
    fetchData();
  }, [p, q]);

  return (
    <section className="recruitment">
      <Search onSearch={handleSearch} />
      <Box>
        {data?.rows.map((item) => {
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
                  <span>{moment(item.createdAt).format("DD/MM/YYYY")}</span>
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
