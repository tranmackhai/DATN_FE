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
import { useSelector } from "react-redux";

const Category = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState();
  const [category, setCategory] = useState();
  const user = useSelector((state) => state.account.account);
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res1 = await categoryApi.getAll({
          slug,
        });
        const res2 = await postsApi.getAll({
          onlyParent: true,
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
      <Grid container>
        <Grid
          item
          xs={9}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="12px 0"
        >
          <Typography
            variant="h6"
            fontWeight="700"
            textTransform="uppercase"
            padding="12px 0"
            marginLeft="12px"
          >
            {category?.title}
          </Typography>
          {(user?.role === "teacher" || user?.role === "admin") &&
          (category?.id === 5 || category?.id === 3) ? (
            <Button
              variant="contained"
              component={Link}
              to={`/chude/${category?.slug}/add`}
              sx={{
                color: "#fff",
                height: "40px",
                fontWeight: "600",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: "rgba(252, 175, 23, 0.8)",
                },
              }}
            >
              Thêm bài viết
            </Button>
          ) : (
            <></>
          )}
          {(user?.role === "student" ||
            user?.role === "recruitment" ||
            user?.role === "teacher" ||
            user?.role === "admin") &&
          category?.id !== 5 &&
          category?.id !== 3 ? (
            <Button
              variant="contained"
              component={Link}
              to={`/chude/${category?.slug}/add`}
              sx={{
                color: "#fff",
                height: "40px",
                fontWeight: "600",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: "rgba(252, 175, 23, 0.8)",
                },
              }}
            >
              Thêm bài viết
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
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
                  <TableCell>Bài viết</TableCell>
                  <TableCell align="center">Thống kê</TableCell>
                  <TableCell align="center">Phản hồi cuối cùng</TableCell>
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
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </span>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell width="150px" align="center">
                        <Box
                          sx={{
                            span: {
                              fontSize: "0.8rem",
                              color: theme.palette.primary.contrastText,
                            },
                          }}
                        >
                          <span>{data.countChildren} Phản hồi</span>
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
                                fontWeight: "500",
                              },
                            }}
                          >
                            <span className="line_clamp">
                              Đăng bởi:
                              {
                                data.children[data?.children.length - 1]
                                  ?.account?.name
                              }
                            </span>
                            {moment(
                              data.children[data?.children.length - 1]
                                ?.createdAt
                            ).format("DD/MM/YYYY HH:mm")}
                            <Link
                              // to={`/diendan/chude/${data.slug}/${data.children[0]?.id}`}
                              to="#"
                            >
                              Xem bài viết
                            </Link>
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
