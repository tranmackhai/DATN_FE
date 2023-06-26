import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import Comment from "../../components/common/Comment";
import { useSelector } from "react-redux";
import newsApi from "../../api/modules/news.api";
import moment from "moment";

const RecruitmentDetail = () => {
  const theme = useTheme();
  const { slug } = useParams();
  const user = useSelector((state) => state.account.account);
  const [recruitment, setRecruitment] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newsApi.getAll({
          type: "recruitment",
          slug: slug,
        });
        setRecruitment(response.data.rows[0]);
      } catch (error) {}
    };
    fetchData();
  }, [slug]);
  if (!recruitment) return <></>;
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
            {recruitment.title}
          </Typography>
          <span>{moment(recruitment.createdAt).format("MM/DD/YYYY")}</span>
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
            <img src={recruitment.thumbnail} />
          </Box>
          <div
            dangerouslySetInnerHTML={{ __html: recruitment.content }}
            className="content"
          ></div>
          {/* {user && <Comment />} */}
        </Box>
      </Box>
    </section>
  );
};

export default RecruitmentDetail;
