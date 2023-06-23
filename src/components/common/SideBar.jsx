import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import newsApi from "../../api/modules/news.api";
import { Link } from "react-router-dom";
import moment from "moment";

const SideBar = () => {
  const theme = useTheme();
  const [news, setNews] = useState();
  console.log(news);
  useEffect(() => {
    (async () => {
      try {
        const res = await newsApi.getAll({
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

  return (
    <section className="sidebar">
      <Box
        sx={{
          textTransform: "uppercase",
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "4px",
          marginLeft: "24px",
          padding: "24px 0",
        }}
      >
        <Box>
          <Typography
            textAlign="center"
            variant="h6"
            color={theme.palette.primary.hightlightText}
            fontWeight={700}
          >
            Giới thiệu
          </Typography>
          <div className="separation"></div>
          <Typography
            textTransform="capitalize"
            padding="0 0 24px 16px"
            textAlign="start"
          >
            Bộ môn trực tiếp quản lý và đào tạo các Kỹ sư chuyên ngành Hệ thống
            thông tin, chuyên ngành Mạng máy tính, chuyên ngành Công nghệ Phần
            mềm và chuyên ngành Khoa học máy tính. Các hệ đào tạo: chính quy,
            vừa làm vừa học, bằng 2, liên thông. Nghiên cứu Khoa học: Tham gia
            đề tài nghiên cứu khoa học các cấp, công bố các bài báo khoa học
            trên các Tạp chí chuyên ngành.
          </Typography>
        </Box>
        <Box>
          <Typography
            textAlign="center"
            variant="h6"
            color={theme.palette.primary.hightlightText}
            fontWeight={700}
          >
            Các tin tức mới
          </Typography>
          <div className="separation"></div>
        </Box>
        <Box paddingLeft="16px">
          {news?.map((item) => {
            return (
              <Link
                key={item.id}
                to={item.slug}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#555555",
                  fontWeight: "500",
                  marginBottom: "12px",
                }}
              >
                <span className="line_clamp">{item.title}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    // marginTop: "4px",
                  }}
                >
                  {moment(item.createdAt).format("DD/MM/YYYY")}
                </span>
              </Link>
            );
          })}
        </Box>
      </Box>
    </section>
  );
};

export default SideBar;
