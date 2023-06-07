import { useTheme } from "@emotion/react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as shortid from "shortid";
import * as Yup from "yup";
import newsApi from "../../api/modules/newsCopy.api";
import uploadApi from "../../api/modules/upload.api";
import { configSlugify } from "../../utils/index.util";

const types = [
  {
    label: "Nghiên cứu khoa học",
    value: "scientificResearch",
  },
  {
    label: "Tin tức",
    value: "news",
  },
  {
    label: "Tuyển dụng",
    value: "recruitment",
  },
];

const NewsFormPageTeacher = () => {
  const theme = useTheme();
  const account = useSelector((state) => state.account.account);
  const newsForm = useFormik({
    initialValues: {
      title: "",
      content: "",
      thumbnail: "",
      type: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Bạn phải chọn loại bài viết"),
      title: Yup.string().required("Bạn phải nhập tiêu đề bài viết"),
      content: Yup.string().required("Bạn phải nhập nội dung bài viết"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await newsApi.create({
          ...values,
          accountId: account?.id,
          isActive: true,
          slug: configSlugify(values.title) + "-" + shortid.generate(),
        });
        if (response.status === 201) {
          toast.success("Đăng bài thành công");
          newsForm.resetForm({
            title: "",
            content: "",
            thumbnail: "",
            type: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await uploadApi.uploadSingle(formData);
      newsForm.setFieldValue("thumbnail", response.data.data.secure_url);
    } catch (error) {}
  };
  return (
    <section className="post-news">
      <ToastContainer />
      <Box component="form" onSubmit={newsForm.handleSubmit}>
        <Box>
          <Typography
            variant="h4"
            textTransform="uppercase"
            fontWeight="700"
            textAlign="center"
            padding="24px 0"
            noWrap
          >
            Đăng bài viết
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
          {/* <Typography
            sx={{ fontWeight: 500, fontSize: "1rem", marginBottom: "12px" }}
          >
           Loại bài viết
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              span: {
                display: "block",
                textAlign: "center",
                margin: "0 4px",
                width: "160px",
                padding: "8px 0",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: "#f8f8f8",
              },
            }}
          >
            {types.map((item) => {
              return (
                <span
                  key={item.value}
                  style={
                    item.value === newsForm.values.type
                      ? { border: "1px solid #fcaf17", backgroundColor: "#fff" }
                      : {}
                  }
                  onClick={() => {
                    newsForm.setFieldValue("type", item.value);
                  }}
                >
                  {item.label}
                </span>
              );
            })}
          </Box>
          <p
            className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root"
            style={{ textAlign: "center" }}
          >
            {newsForm.touched.role && newsForm.errors.type}
          </p>
          <TextField
            type="text"
            placeholder="Tiêu đề"
            name="title"
            fullWidth
            value={newsForm.values.title}
            onChange={newsForm.handleChange}
            color="success"
            error={
              newsForm.touched.title && newsForm.errors.title !== undefined
            }
            helperText={newsForm.touched.title && newsForm.errors.title}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              label: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "240px",
                border: "2px dashed gray",
                cursor: "pointer",
                backgroundColor: "#f8f8f8",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              },
            }}
          >
            <label htmlFor="dropzone-file">
              {newsForm.values.thumbnail === "" ? (
                <Stack
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px 0 6px 0",
                    svg: {
                      width: "40px",
                      height: "40px",
                      marginBottom: "12px",
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p>
                    <span
                      style={{
                        color: theme.palette.primary.highlightText,
                        fontWeight: "500",
                      }}
                    >
                      Bấm vào đây để thêm ảnh
                    </span>
                  </p>
                </Stack>
              ) : (
                <img
                  src={newsForm.values.thumbnail}
                  alt=""
                  style={{ width: "100%", height: "240px", objectFit: "cover" }}
                />
              )}
              <input
                id="dropzone-file"
                type="file"
                hidden
                onChange={(e) => {
                  handleChangeFile(e);
                }}
              />
            </label>
          </Box>
          <ReactQuill
            placeholder="Nhập nội dung bài viết"
            theme="snow"
            value={newsForm.values.content}
            onChange={(value) => {
              newsForm.setFieldValue("content", value);
            }}
          />
          <Box></Box>
          <button
            type="submit"
            style={{
              width: "120px",
              padding: "10px 0",
              borderRadius: "4px",
              outline: "none",
              cursor: "pointer",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.contrastText,
              fontWeight: "600",
              border: "none",
              textTransform: "uppercase",
            }}
          >
            Đăng bài
          </button>
        </Stack>
      </Box>
    </section>
  );
};

export default NewsFormPageTeacher;
