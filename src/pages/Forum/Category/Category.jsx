import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import moment from "moment";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Paper from "@mui/material/Paper";
import SidebarForum from "../SidebarForum";
import { useParams, Link } from "react-router-dom";
import postsApi from "../../../api/modules/posts.api";
import categoryApi from "../../../api/modules/category.api";

const Category = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState();
  const [category, setCategory] = useState();
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res1 = await categoryApi.getAll({
          slug,
        });
        const res2 = await postsApi.getAll({
          categorySlug: slug,
        });
        if (res1.status === 200) {
          setCategory(res1.data.rows[0]);
        }
        if (res2.status === 200) {
          setPosts(res2.data);
        }
        console.log(res2.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [slug]);

  return (
    <Container disableGutters={true} maxWidth="lg">
      <Typography
        variant="h6"
        fontWeight="700"
        textTransform="uppercase"
        padding="12px 0"
        marginLeft="12px"
      >
        {category?.title}
      </Typography>
      <Button component={Link} to={`${category?.slug}/add`}>
        Thêm bài viết
      </Button>
      <Grid container>
        <Grid
          item
          xs={9}
          sx={{
            padding: "24px 12px",
            borderRadius: "4px",
            border: `1px solid ${theme.palette.primary.border}`,
          }}
        >
          <TableContainer component={Paper}>
            <Table
            // sx={{ tableLayout: "fixed", width: "100%" }}
            // aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Chủ đề</TableCell>
                  <TableCell align="center">Thống kê</TableCell>
                  <TableCell align="center">Bài viết cuối cùng</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#f8f8f8" }}>
                  <TableCell colSpan="4" sx={{ border: "none" }}>
                    {/* <Link to="">Khu vực điều hành</Link> */}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts?.rows.map((data) => {
                  return (
                    <TableRow key={data.id}>
                      <TableCell>
                        <Box
                          sx={{
                            display: "table",
                            tableLayout: "fixed",
                            width: "100%",
                          }}
                        >
                          <Box display="flex">
                            <IconButton>
                              <ChatIcon />
                            </IconButton>
                            <Box
                              display="flex"
                              flexDirection="column"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              sx={{
                                a: {
                                  fontSize: "0.9rem",
                                  color: theme.palette.secondary.main,
                                  fontWeight: "600",
                                },
                                span: {
                                  fontSize: "0,8rem",
                                  color: theme.palette.primary.contrastText,
                                },
                              }}
                            >
                              <Link to={`${data.id}`}>{data.title}</Link>
                              <span style={{ padding: "2px 0" }}>
                                Đăng bởi {data.account.name}
                              </span>
                              <span>
                                {moment(data.createdAt).format(
                                  "MM/DD/YYYY HH:mm"
                                )}
                              </span>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell width="150px">
                        <Box display="flex">
                          <IconButton>
                            <AttachFileIcon />
                          </IconButton>
                          <Box
                            display="flex"
                            flexDirection="column"
                            sx={{
                              span: {
                                fontSize: "0.8rem",
                                color: theme.palette.primary.contrastText,
                              },
                            }}
                          >
                            <span>30 Phản hồi</span>
                            <span>500000 View</span>
                            <span>0 Likes</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell width="200px">
                        <Box display="flex">
                          <IconButton>
                            <AccountBoxIcon />
                          </IconButton>
                          <Box
                            display="flex"
                            flexDirection="column"
                            sx={{
                              a: {
                                color: theme.palette.secondary.main,
                                fontSize: "0.9rem",
                              },
                              span: {
                                fontSize: "0.8rem",
                                color: theme.palette.primary.contrastText,
                              },
                            }}
                          >
                            <span>by Trần Mặc Khải</span>
                            <span>05-10-2023, 17:53</span>
                            <Link to="">Xem bài viết</Link>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3}>
          <SidebarForum />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Category;
