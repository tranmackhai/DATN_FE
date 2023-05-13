import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { news } from "../../api/modules/news.api";
import { useParams } from "react-router-dom";
import Comment from "../../components/common/Comment";

const NewsDetail = () => {
  const theme = useTheme();
  const { slug } = useParams();
  const data = news.find((item) => item.slug === slug);
  return (
    <section className="news-detail">
      <Box>
        <Box
          sx={{
            span: {
              color: theme.palette.primary.contrastText,
              fontSize: "0.8rem",
            },
            img: {
              objectFit: "cover",
              width: "500",
              height: "300px",
              margin: "24px 0",
            },
          }}
        >
          <Typography variant="h5" fontWeight={500} marginBottom="24px">
            {data.title}
          </Typography>
          <span>{data.createdAt}</span>
          <Box textAlign="center">
            <img src={data.img} />
          </Box>
          <Typography>{data.content}</Typography>
          <Comment />
        </Box>
      </Box>
    </section>
  );
};

export default NewsDetail;
