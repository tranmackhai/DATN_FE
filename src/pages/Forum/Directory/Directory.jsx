import React from "react";
import { useTheme } from "@emotion/react";
import moment from "moment";
import {
  Box,
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
import ForumIcon from "@mui/icons-material/Forum";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Paper from "@mui/material/Paper";
import SidebarForum from "../SidebarForum";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import categoryApi from "../../../api/modules/category.api";
import { useState } from "react";
import { Fragment } from "react";

const Directory = () => {
  const theme = useTheme();

  const [categorys, setCategorys] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await categoryApi.getAll({ sortType: "ASC" });
        if (res.status === 200) {
          setCategorys(
            res.data.rows.filter((item) => item.children.length > 0)
          );
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Container disableGutters={true} maxWidth="lg">
      <Typography
        variant="h6"
        fontWeight="700"
        textTransform="uppercase"
        padding="12px 0"
        marginLeft="12px"
      >
        Diễn đàn
      </Typography>
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
                  <TableCell>Danh mục</TableCell>
                  <TableCell align="center">Chủ đề</TableCell>
                  <TableCell align="center">Bài viết</TableCell>
                  <TableCell align="center">Bài viết cuối cùng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categorys?.map((data, index) => {
                  return (
                    <Fragment key={index}>
                      <TableRow sx={{ backgroundColor: "#f8f8f8" }}>
                        <TableCell colSpan="4" sx={{ border: "none" }}>
                          <Link
                            to={data.slug}
                            style={{
                              color: "#000",
                              fontWeight: "500",
                              fontSize: "0.9rem",
                            }}
                          >
                            {data.title}
                          </Link>
                        </TableCell>
                      </TableRow>
                      {data.children.map((item) => {
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
                            <TableCell align="center" width="80px">
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
                                        color:
                                          theme.palette.primary.contrastText,
                                      },
                                    }}
                                  >
                                    <Link to="">
                                      Đổi ảnh đại diện cho sinh viên đã tốt
                                      nghiệp.
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
                    </Fragment>
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

export default Directory;
