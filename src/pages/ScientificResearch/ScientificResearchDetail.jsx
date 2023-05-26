import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { scientificResearch } from "../../api/modules/scientificResearch.api";
import { useTheme } from "@emotion/react";
import Comment from "../../components/common/Comment";
import { useSelector } from "react-redux";

const ScientificResearchDetail = () => {
  const { slug } = useParams();
  const theme = useTheme();
  const user = useSelector((state) => state.account.account);
  const data = scientificResearch.find((item) => item.slug === slug);

  // if (!slug) return <></>;
  // console.log(data);
  return (
    <section className="scientific-research-detail">
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
        {user && <Comment />}
      </Box>
    </section>
  );
};

export default ScientificResearchDetail;
