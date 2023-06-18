import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import newsApi from "../../../../api/modules/news.api";
import { useSelector } from "react-redux";
import ConfirmDialog from "../../../../components/common/ConfirmDialog";

const MyPost = () => {
  const [data, setData] = useState({ rows: [], count: 0 });
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.account);
  const [query] = useSearchParams();
  const p = query.get("p") || 1;

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState();

  const handlePageChange = (page) => {
    navigate(`?p=${page}`);
  };

  const handleConfirm = async () => {
    if (current) {
      try {
        const response = await newsApi.delete(current.id);
        console.log(response);
        if (response.status === 200) {
          const res = await newsApi.getByUser({
            limit: 5,
            p: p,
          });
          setData(res.data);
        }
      } catch (error) {}
    }
  };

  const deleteNews = async (item) => {
    setCurrent(item);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newsApi.getByUser({
          limit: 5,
          p: p,
        });
        setData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, [p]);

  return (
    <section className="my-post">
      <Box
        component="form"
        // onSubmit={changePasswordForm.handleSubmit}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "4px",
          padding: "20px",
          height: "516px",
        }}
      >
        <ToastContainer />
        <TableContainer component={Paper}>
          <Table
            sx={{ tableLayout: "fixed", width: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Tiêu đề</TableCell>
                <TableCell align="center">Ảnh</TableCell>
                <TableCell align="center">Ngày đăng bài</TableCell>
                {user?.role === "teacher" && (
                  <TableCell align="center">Kiểu bài viết</TableCell>
                )}

                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.rows.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="line_clamp-table"
                  >
                    {item.title}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={item.thumbnail}
                      alt=""
                      style={{
                        width: "120px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  {user?.role === "teacher" && (
                    <TableCell align="center">
                      <span>
                        {item.type === "recruitment" && "Tuyển dụng"}
                        {item.type === "news" && "Tin tức"}
                        {item.type === "scientificResearch" && "NCKH"}
                      </span>
                    </TableCell>
                  )}
                  <TableCell align="center">
                    <>
                      {item.type === "recruitment" && (
                        <IconButton
                          LinkComponent={Link}
                          to={`/tuyendung/${item.slug}`}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      )}
                      {item.type === "scientificResearch" && (
                        <IconButton
                          LinkComponent={Link}
                          to={`/nckh/${item.slug}`}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      )}
                      {item.type === "news" && (
                        <IconButton
                          LinkComponent={Link}
                          to={`/tintuc/${item.slug}`}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => deleteNews(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {open && (
          <ConfirmDialog
            onClose={() => setOpen(false)}
            onConfirm={() => handleConfirm()}
            open={open}
          />
        )}
        {data?.count > 0 && (
          <Pagination
            count={Math.ceil(data.count / 5)}
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
      </Box>
    </section>
  );
};

export default MyPost;
