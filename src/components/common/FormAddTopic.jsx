import { useTheme } from "@emotion/react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import categoryApi from "../../api/modules/category.api";
import { configSlugify } from "../../utils/index.util";

const FormAddTopic = () => {
  const theme = useTheme();
  const [topics, setTopics] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  // console.log(slug);
  // console.log(topics);

  const topicForm = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Nhập chủ đề"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await categoryApi.create({
          ...values,
          parentId: topics.id,
          slug: configSlugify(values.title),
        });
        console.log(values);
        if (response.status === 201) {
          toast.success("Thêm chủ đề thành công");
          setTopics([topics, ...topics.children]);
          // topicForm.resetForm({ title: "" });
          navigate(`/diendan/${topics.slug}/`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleReset = () => {
    topicForm.resetForm({
      title: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll({ slug });
        setTopics(response.data.rows[0]);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <section className="form-add_topic">
      <ToastContainer />
      <Box component="form" onSubmit={topicForm.handleSubmit}>
        <Box>
          <Typography
            variant="h5"
            textTransform="uppercase"
            fontWeight="700"
            textAlign="center"
            padding="24px 0"
            noWrap
          >
            Thêm chủ đề
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
            value={topicForm.values.title}
            onChange={topicForm.handleChange}
            color="success"
            error={
              topicForm.touched.title && topicForm.errors.title !== undefined
            }
            helperText={topicForm.touched.title && topicForm.errors.title}
          />
          <TextField
            type="text"
            placeholder="Mô tả"
            name="description"
            fullWidth
            value={topicForm.values.description}
            onChange={topicForm.handleChange}
            color="success"
            error={
              topicForm.touched.description &&
              topicForm.errors.description !== undefined
            }
            helperText={
              topicForm.touched.description && topicForm.errors.description
            }
          />
          <Box marginBottom="48px">
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
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

export default FormAddTopic;
