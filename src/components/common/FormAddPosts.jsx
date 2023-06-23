import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import { configSlugify } from "../../utils/index.util";
import postsApi from "../../api/modules/posts.api";
import shortid from "shortid";
import categoryApi from "../../api/modules/category.api";

const FormAddPosts = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  console.log(slug);
  console.log(posts);

  const postsForm = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Nhập tiêu đề bài viết"),
      content: Yup.string().required("Nhập nội dung bài viết"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await postsApi.create({
          ...values,
          categoryId: posts.id,
          slug: configSlugify(values.title) + "-" + shortid,
        });
        console.log(values);
        if (response.status === 201) {
          toast.success("Thêm bài viết thành công");
          setPosts([posts, ...posts.children]);
          postsForm.resetForm({ title: "", content: "" });
          navigate(`/diendan/chude/${posts.slug}/ `);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleReset = () => {
    postsForm.resetForm({
      title: "",
      content: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll({ slug });
        setPosts(response.data.rows[0]);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <section className="form-add_posts">
      <ToastContainer />
      <Box component="form" onSubmit={postsForm.handleSubmit}>
        <Box>
          <Typography
            variant="h5"
            textTransform="uppercase"
            fontWeight="700"
            textAlign="center"
            padding="24px 0"
            noWrap
          >
            Thêm bài viết
          </Typography>
        </Box>
        <Stack
          spacing={3}
          margin="12px auto 48px auto"
          width="700px"
          justifyContent="center"
          sx={{
            textarea: {
              width: "100%",
              maxWidth: "100%",
            },
          }}
        >
          <TextField
            type="text"
            placeholder="Tên danh mục hoặc chủ đề"
            name="title"
            fullWidth
            value={postsForm.values.title}
            onChange={postsForm.handleChange}
            color="success"
            error={
              postsForm.touched.title && postsForm.errors.title !== undefined
            }
            helperText={postsForm.touched.title && postsForm.errors.title}
          />
          <ReactQuill
            placeholder="Nhập nội dung bài viết"
            theme="snow"
            value={postsForm.values.content}
            onChange={(value) => {
              postsForm.setFieldValue("content", value);
            }}
          />
          {postsForm.touched.content && postsForm.errors.content ? (
            <p
              className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root"
              style={{ color: "red" }}
            >
              {postsForm.touched.content && postsForm.errors.content}
            </p>
          ) : (
            <></>
          )}
          <Box marginBottom="48px">
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{
                width: "120px",
                padding: "10px 0",
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
              Thêm
            </Button>
            <Button
              variant="contained"
              onClick={() => handleReset()}
              sx={{
                width: "120px",
                padding: "10px 0",
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
        </Stack>
      </Box>
    </section>
  );
};

export default FormAddPosts;
