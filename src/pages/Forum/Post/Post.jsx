import { useTheme } from "@emotion/react";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Popper,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import shortid from "shortid";
import * as Yup from "yup";
import postsApi from "../../../api/modules/posts.api";
import { configSlugify } from "../../../utils/index.util";

const Post = () => {
  const theme = useTheme();
  const { slug, id } = useParams();
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [repPosts, setRepPosts] = useState([]);
  const [parentId, setParentId] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenComment = (id) => {
    console.log(id);
    setOpenComment(true);
    setParentId(id);
  };

  const handleClose = () => setOpen(false);
  const handleCloseComment = () => setOpenComment(false);
  const [posts, setPosts] = useState();

  // console.log(slug, id);
  // console.log(posts);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open2 = Boolean(anchorEl);
  const id2 = open ? "simple-popper" : undefined;

  const handleUpdate = () => {};
  const handleDelete = () => {};

  const feedbackForm = useFormik({
    initialValues: {
      content: "",
    },

    validationSchema: Yup.object({
      content: Yup.string().required("Nhập nội dung phản hồi"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await postsApi.create({
          ...values,
          parentId: posts.id,
          categoryId: posts.categoryId,
          title: posts.title,
          slug: configSlugify(posts.title) + "-" + shortid,
        });
        console.log(values);
        if (response.status === 201) {
          toast.success("Thêm phản hồi thành công");
          setRepPosts([...repPosts, response.data]);
          setOpen(false);
          feedbackForm.resetForm({ content: "" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const commentForm = useFormik({
    initialValues: {
      content: "",
    },

    validationSchema: Yup.object({
      content: Yup.string().required("Nhập nội dung bình luận"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await postsApi.create({
          ...values,
          parentId: parentId,
          categoryId: posts.categoryId,
          title: posts.title,
          slug: configSlugify(posts.title) + "-" + shortid,
        });
        console.log(values);
        if (response.status === 201) {
          toast.success("Thêm phản hồi thành công");
          setRepPosts([...repPosts, response.data]);
          setOpen(false);
          commentForm.resetForm({ content: "" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleReset = () => {
    feedbackForm.resetForm({
      content: "",
    });
  };
  const handleResetComment = () => {
    commentForm.resetForm({
      content: "",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res1 = await postsApi.getById(id);
        if (res1.status === 200) {
          const res2 = await postsApi.getAll({
            id,
            title: res1.data.title,
            sortType: "ASC",
          });
          setPosts(res1.data);
          setRepPosts(res2.data.rows);
          console.log(res2.data.rows);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [slug]);

  return (
    <section className="posts">
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
        {/* Posts parent */}
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
                  fontWeight: "600",
                  fontSize: "1rem",
                  span: {
                    color: posts?.account.role === "admin" ? "red" : "black",
                  },
                }}
              >
                {posts?.account.role === "admin" && <span>Quản Trị Viên</span>}
                {posts?.account.role === "student" && <span>Sinh viên</span>}
                {posts?.account.role === "teacher" && <span>Giảng viên</span>}
              </Typography>
              <span>{posts?.account.name}</span>
              <span className="separation"></span>
              <span
                style={{ color: "rgb(102 105 102 / 90%)", fontSize: "0.9rem" }}
              >
                {moment(posts?.createdAt).format("DD/MM/YYYY HH:mm")}
              </span>
              {/* <span>Số bài viết: 30</span> */}
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
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: posts?.content }}
              style={{ overflow: "hidden" }}
            ></div>
            <Button
              onClick={handleOpen}
              variant="contained"
              color="success"
              sx={{
                float: "right",
                width: "120px",
                padding: "8px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
                marginRight: "12px",
              }}
            >
              Phản hồi
            </Button>
          </Grid>
        </Grid>
        {/* Posts children */}
        {repPosts.map((data) => {
          return (
            <Grid
              container
              item
              key={data.id}
              id={data.id}
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
                      src="https://res.cloudinary.com/dhypn6jgk/image/upload/v1687444467/IT_UTC2/Icon/default_avatar_medium_qrfq52.png"
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
                      fontWeight: "600",
                      fontSize: "1rem",
                      span: {
                        color: data?.account.role === "admin" ? "red" : "black",
                      },
                    }}
                  >
                    {data?.account.role === "admin" && (
                      <span>Quản Trị Viên</span>
                    )}
                    {data?.account.role === "student" && <span>Sinh viên</span>}{" "}
                    {data?.account.role === "teacher" && (
                      <span>Giảng viên</span>
                    )}
                  </Typography>
                  <span>{data?.account.name}</span>
                  <span className="separation"></span>
                  <span
                    style={{
                      color: "rgb(102 105 102 / 90%)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {moment(data?.createdAt).format("DD/MM/YYYY HH:mm")}
                  </span>
                  {/* <span>Số bài viết: 30</span> */}
                </Box>
              </Grid>
              <Grid
                item
                xs={10}
                sx={{ backgroundColor: "#ebf4f9", padding: "8px 12px" }}
              >
                <Box>
                  {data?.parent?.id !== +id ? (
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{
                        __html: data?.parent?.content,
                      }}
                      style={{ overflow: "hidden" }}
                    ></div>
                  ) : (
                    <></>
                  )}
                </Box>
                <span
                  style={{
                    color: "rgb(102 105 102 / 90%)",
                    fontSize: "0.9rem",
                  }}
                >
                  {moment(data?.createdAt).format("DD/MM/YYYY HH:mm")}
                </span>
                <Box display="flex" justifyContent="space-between">
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                    style={{ overflow: "hidden" }}
                  ></div>
                  <div>
                    <IconButton
                      aria-describedby={id}
                      type="button"
                      onClick={handleClick}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                    <Popper
                      id={id2}
                      open={open2}
                      anchorEl={anchorEl}
                      sx={{
                        ul: {
                          backgroundColor: "#fff",
                          marginRight: "12px",
                          padding: "0 18px",
                          borderRadius: "4px",
                          boxShadow:
                            "rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px",
                          li: {
                            padding: "6px 0",
                          },
                        },
                      }}
                    >
                      <ul>
                        <li onClick={handleUpdate}>Sửa</li>
                        <li onClick={handleDelete}>Xoá</li>
                      </ul>
                    </Popper>
                  </div>
                </Box>
                <IconButton
                  onClick={() => handleOpenComment(data?.id)}
                  sx={{
                    width: "120px",
                    padding: "8px 0",
                    borderRadius: "4px",
                    outline: "none",
                    cursor: "pointer",
                    color: theme.palette.primary.hightlightText,
                    fontWeight: "600",
                    border: "none",
                    textTransform: "uppercase",
                    marginRight: "12px",
                  }}
                >
                  <FeedbackIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
        <Modal open={open} onClose={handleClose}>
          <Box
            component="form"
            onSubmit={feedbackForm.handleSubmit}
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              height: 300,
              backgroundColor: "background.paper",
              border: "1px solid #f8f8f8",
              borderRadius: "4px",
              boxShadow: 24,
              boxShadow: "rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px",
              p: 4,
              textarea: {
                outline: "none",
                color: theme.palette.primary.contrastText,
                width: "100%",
                maxWidth: "100%",
                border: `2px solid ${theme.palette.primary.border}`,
                borderRadius: "4px",
                fontSize: "1.3rem",
                margin: "12px 0",
              },
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nhập phản hồi
            </Typography>
            <textarea
              rows={4}
              name="content"
              value={feedbackForm.values.content}
              onChange={feedbackForm.handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                float: "right",
                width: "120px",
                padding: "8px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
              }}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              onClick={() => handleReset()}
              sx={{
                float: "right",
                marginRight: "12px",
                width: "120px",
                padding: "8px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "#767C75",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: "rgb(118,124,117, 0.9)",
                },
              }}
            >
              Huỷ
            </Button>
          </Box>
        </Modal>
        <Modal open={openComment} onClose={handleCloseComment}>
          <Box
            component="form"
            onSubmit={commentForm.handleSubmit}
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              height: 300,
              backgroundColor: "background.paper",
              border: "1px solid #f8f8f8",
              borderRadius: "4px",
              boxShadow: 24,
              boxShadow: "rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px",
              p: 4,
              textarea: {
                outline: "none",
                color: theme.palette.primary.contrastText,
                width: "100%",
                maxWidth: "100%",
                border: `2px solid ${theme.palette.primary.border}`,
                borderRadius: "4px",
                fontSize: "1.3rem",
                margin: "12px 0",
              },
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nhập bình luận
            </Typography>
            <textarea
              rows={4}
              name="content"
              value={commentForm.values.content}
              onChange={commentForm.handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                float: "right",
                width: "120px",
                padding: "8px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
              }}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              onClick={() => handleResetComment()}
              sx={{
                float: "right",
                marginRight: "12px",
                width: "120px",
                padding: "8px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "#767C75",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: "rgb(118,124,117, 0.9)",
                },
              }}
            >
              Huỷ
            </Button>
          </Box>
        </Modal>
      </Container>
    </section>
  );
};

export default Post;
