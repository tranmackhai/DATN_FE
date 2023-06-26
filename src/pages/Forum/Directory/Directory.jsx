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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import categoryApi from "../../../api/modules/category.api";
import { useState } from "react";
import { Fragment } from "react";

const Directory = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [query] = useSearchParams();
  const p = query.get("p") || 1;
  const q = query.get("q") || "";
  const sortBy = query.get("sortBy") || "id";
  const sortType = query.get("sortType") || "DESC";

  const [categorys, setCategorys] = useState();
  console.log(categorys);

  const handlePageChange = (page) => {
    navigate(`?p=${page}&q=${q}&sortBy=${sortBy}&sortType=${sortType}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await categoryApi.getAll({ sortType: "ASC" });
        if (res.status === 200) {
          setCategorys(res.data.rows.filter((item) => item.parentId === null));

          // console.log(res);
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Danh mục</TableCell>
                  <TableCell align="center">Bài viết</TableCell>
                  <TableCell align="center">Phản hồi</TableCell>
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
                                <IconButton sx={{ cursor: "default" }}>
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
                            <TableCell align="center" width="100px">
                              {
                                item.postsList?.filter(
                                  (item) => !item?.parentId
                                ).length
                              }
                            </TableCell>
                            <TableCell align="center" width="100px">
                              {
                                item.postsList?.filter((item) => item?.parentId)
                                  .length
                              }
                            </TableCell>
                            <TableCell width="250px">
                              <Box
                                sx={{
                                  display: "table",
                                  tableLayout: "fixed",
                                  width: "100%",
                                }}
                              >
                                <Box display="flex">
                                  <IconButton sx={{ cursor: "default" }}>
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
                                    <Link
                                      // to={`/diendan/chude/${item.slug}/${
                                      //   item.postsList[0]?.id
                                      // }#${
                                      //   item.postsList[
                                      //     item?.postsList.length - 1
                                      //   ]?.id
                                      // }`}
                                      to="#"
                                    >
                                      Xem bài viết
                                    </Link>
                                    <span>
                                      By:{" "}
                                      {
                                        item.postsList[
                                          item?.postsList.length - 1
                                        ]?.account?.name
                                      }
                                    </span>
                                    {moment(
                                      item.postsList[item?.postsList.length - 1]
                                        ?.createdAt
                                    ).format("DD/MM/YYYY")}
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
          {categorys?.count > 0 && (
            <Pagination
              count={Math.ceil(categorys.count / 5)}
              shape="rounded"
              onChange={(e, page) => {
                handlePageChange(page);
              }}
              sx={{
                marginTop: "24px",
                ul: { justifyContent: "center" },
              }}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          <SidebarForum />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Directory;
