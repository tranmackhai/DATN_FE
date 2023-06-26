import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Comment from "../../components/common/Comment";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.core.css";
import newsApi from "../../api/modules/news.api";

const ScientificResearchDetail = () => {
  const { slug } = useParams();
  const theme = useTheme();
  const user = useSelector((state) => state.account.account);
  const [scientificResearch, setScientificResearch] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newsApi.getAll({
          type: "scientificResearch",
          slug: slug,
        });
        setScientificResearch(response.data.rows[0]);
      } catch (error) {}
    };
    fetchData();
  }, [slug]);
  if (!scientificResearch) return <></>;

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
          {scientificResearch.title}
        </Typography>
        <span>{scientificResearch.createdAt}</span>
        <Box
          textAlign="center"
          className="content"
          width="50%"
          margin="0 auto"
          sx={{
            img: {
              objectFit: "contain",
            },
          }}
        >
          <img src={scientificResearch.thumbnail} />
        </Box>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: scientificResearch.content }}
        ></div>
        {/* {user && <Comment />} */}
      </Box>
    </section>
  );
};

export default ScientificResearchDetail;
