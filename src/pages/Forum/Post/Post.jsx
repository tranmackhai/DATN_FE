import { useTheme } from "@emotion/react";
import { Box, Container, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postsApi from "../../../api/modules/posts.api";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Post = () => {
  const theme = useTheme();
  const { slug, id } = useParams();
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await postsApi.getById(id);
        if (res.status === 200) {
          setPosts(res.data);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [slug]);

  return (
    <section className="post">
      <Container disableGutters={true} maxWidth="lg">
        <Typography
          variant="h6"
          fontWeight="700"
          textTransform="uppercase"
          padding="12px 0"
        >
          {posts?.title}
        </Typography>
        <div className="separation"></div>
        <Grid
          container
          item
          margin="12px 0"
          borderRadius="4px"
          border="1px solid #c8ccce"
        >
          <Grid item xs={2} sx={{ backgroundColor: "#c8ccce" }}>
            <Box
              display="flex"
              flexDirection="column"
              textAlign="center"
              sx={{
                span: {
                  fontSize: "1rem",
                  color: theme.palette.primary.highlightText,
                  "&:last-child": {
                    marginBottom: "8px",
                  },
                },
              }}
            >
              <Box>
                <img
                  src="https://forum.uit.edu.vn/core/images/default/default_avatar_medium.png"
                  alt="#logo"
                  style={{
                    objectFit: "cover",
                    width: 70,
                    height: 70,
                    marginRight: "12px",
                    alignItems: "center",
                    margin: "12px 0",
                    borderRadius: "4px",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: posts?.account.role === "admin" ? "red" : "black",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                {posts?.account.role}
              </Typography>
              <span>{posts?.account.name}</span>
              <span className="separation"></span>
              <span
                style={{ color: "rgb(102 105 102 / 90%)", fontSize: "0.9rem" }}
              >
                {moment(posts?.createdAt).format("DD/MM/YYYY HH:mm")}
              </span>
              <span>Số bài viết: 30</span>
            </Box>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{ backgroundColor: "#ebf4f9", padding: "8px 12px" }}
          >
            <Typography variant="h6" fontWeight="500">
              {posts?.title}
            </Typography>
            <span
              style={{ color: "rgb(102 105 102 / 90%)", fontSize: "0.9rem" }}
            >
              {moment(posts?.createdAt).format("DD/MM/YYYY HH:mm")}
            </span>
            <div dangerouslySetInnerHTML={{ __html: posts?.content }}></div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Post;
