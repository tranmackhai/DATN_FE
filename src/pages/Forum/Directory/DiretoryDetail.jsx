import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ForumIcon from "@mui/icons-material/Forum";
import Paper from "@mui/material/Paper";
import categoryApi from "../../../api/modules/category.api";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import SidebarForum from "../SidebarForum";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DiretoryDetail = () => {
  const theme = useTheme();

  const [category, setCategory] = useState();
  const { slug } = useParams();
  // console.log(slug);
  console.log(category);
  const user = useSelector((state) => state.account.account);
  // console.log(user);

  useEffect(() => {
    (async () => {
      try {
        const res = await categoryApi.getAll({ sortType: "ASC", slug });
        if (res.status === 200) {
          setCategory(res.data.rows[0]);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container disableGutters={true} maxWidth="lg">
      <Grid container>
        <Grid
          item
          xs={9}
          display="flex"
          padding="12px 0"
          alignItems="center"
          justifyContent="space-between"
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
          {user?.role === "teacher" || user?.role === "admin" ? (
            <Button
              variant="contained"
              component={Link}
              to={`/danhmuc/${category?.slug}/add`}
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
              Thêm chủ đề
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
                  <TableCell>Chủ đề</TableCell>
                  <TableCell align="center">Bài viết</TableCell>
                  <TableCell align="center">Phản hồi</TableCell>
                  <TableCell align="center">Bài viết cuối cùng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {category?.children?.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box display="flex">
                          <IconButton>
                            <ForumIcon />
                          </IconButton>
                          <Box
                            display="flex"
                            flexDirection="column"
                            sx={{
                              a: {
                                fontSize: "1.1rem",
                                color: theme.palette.secondary.main,
                                fontWeight: "600",
                              },
                              span: {
                                fontSize: "0.8rem",
                                color: theme.palette.primary.contrastText,
                              },
                            }}
                          >
                            <Link to={`/diendan/chude/${item.slug}`}>
                              {item.title}
                            </Link>
                            <span className="line_clamp">
                              {item.description}
                            </span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center" width="80px">
                        30
                      </TableCell>
                      <TableCell align="center" width="100px">
                        30
                      </TableCell>
                      <TableCell width="300px">
                        <Box
                          sx={{
                            display: "table",
                            tableLayout: "fixed",
                            width: "100%",
                          }}
                        >
                          <Box display="flex">
                            <IconButton>
                              <AccountBoxIcon />
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
                                  fontSize: "0.8rem",
                                  color: theme.palette.primary.contrastText,
                                },
                              }}
                            >
                              <Link to="">
                                Đổi ảnh đại diện cho sinh viên đã tốt nghiệp.
                              </Link>
                              <span>By: 2321312</span>
                              <span>dd/mm/yyyy/time</span>
                            </Box>
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

export default DiretoryDetail;
