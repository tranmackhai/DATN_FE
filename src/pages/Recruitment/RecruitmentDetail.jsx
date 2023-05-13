import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { jobs } from "../../api/modules/jobs.api";
import Comment from "../../components/common/Comment";

const RecruitmentDetail = () => {
  const theme = useTheme();
  const { slug } = useParams();
  const data = jobs.find((item) => item.slug === slug);
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

export default RecruitmentDetail;
