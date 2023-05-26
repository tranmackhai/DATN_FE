import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { jobs } from "../../api/modules/jobs.api";
import Comment from "../../components/common/Comment";
import { useSelector } from "react-redux";
import newsApi from "../../api/modules/newsCopy.api";

const RecruitmentDetail = () => {
  const theme = useTheme();
  const { slug } = useParams();
  const [news, setNews] = useState();
  const data = jobs.find((item) => item.slug === slug);
  const user = useSelector((state) => state.account.account);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newsApi.getAll({
          type: "recruitment",
          slug: slug,
        });
        setNews(response.data.rows[0]);
      } catch (error) {}
    };
    fetchData();
  }, [slug]);
  if (!news) return <></>;
  return (
    <section className="recruitment-detail">
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
            {news.title}
          </Typography>
          <span>{news.createdAt}</span>
          <Box textAlign="center">
            <img src={news.thumbnail} />
          </Box>
          <div dangerouslySetInnerHTML={{ __html: news.content }}></div>
          {user && <Comment />}
        </Box>
      </Box>
    </section>
  );
};

export default RecruitmentDetail;
