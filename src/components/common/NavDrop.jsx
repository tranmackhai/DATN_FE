import { Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAccount } from "../../redux/features/accountSlice";
import accountApi from "../../api/modules/account.api";

const NavDrop = ({ items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async (e, title) => {
    if (title === "Đăng xuất") {
      try {
        e.preventDefault();
        const res = await accountApi.logout();
        // console.log(res);
        if (res.response.data.message === "Đăng xuất thành công") {
          dispatch(setAccount(null));
          navigate("/");
        }
      } catch (error) {}
    }
  };
  return (
    <section className="navdrop">
      <Box
        sx={{
          marginTop: "12px",
          position: "absolute",
          zIndex: "2",
          backgroundColor: "#fff",
          borderRadius: "4px",
          padding: "12px 24px",
          minWidth: "280px",
          boxShadow: "rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px",
        }}
      >
        {items?.map((item, index) => {
          {
            /* console.log(item); */
          }
          return (
            <Box
              key={index}
              sx={{
                padding: "8px",
                borderBottom: "1px solid #ececec",
                ":last-child": {
                  borderBottom: "none",
                },
                "&::after": {
                  content: `""`,
                  position: "absolute",
                  width: "80px",
                  backgroundColor: "transperant",
                  height: "24px",
                  top: "-20px",
                  left: "10px",
                },
              }}
            >
              <Link
                to={item.path}
                onClick={(e) => {
                  handleClick(e, item.title);
                }}
              >
                {item.title}
              </Link>
            </Box>
          );
        })}
      </Box>
    </section>
  );
};

export default NavDrop;
