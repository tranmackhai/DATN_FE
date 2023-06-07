import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAccount } from "../../../redux/features/accountSlice";
import accountApi from "../../../api/modules/account.api";

const SidebarUserPage = ({ list_item, active, setActive }) => {
  const theme = useTheme();
  const user = useSelector((state) => state.account.account);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const res = await accountApi.logout();
      // console.log(res);
      if (res.response.data.message === "Đăng xuất thành công") {
        dispatch(setAccount(null));
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        minHeight: "472px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        padding: "0",
        textAlign: "center",
        height: "516px",
      }}
    >
      <Box
        sx={{
          marginBottom: "36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          img: {
            marginTop: "28px",
            width: "90px",
            height: "90px",
            overflow: "hidden",
            objectFit: "cover",
            textAlign: "center",
          },
        }}
      >
        <img
          src="https://res.cloudinary.com/dhypn6jgk/image/upload/v1684843203/IT_UTC2/Icon/account_ava_yptgms.webp"
          alt=""
        />
        <Box
          sx={{
            a: {
              display: "block",
              width: "220px",
              color: "#fff",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "10px",
              padding: "1px 24px",
              marginTop: "4px",
              fontSize: "1rem",
            },
          }}
        >
          {/* <span>{`${user.first_name} ${user.last_name}`}</span> */}
          <Typography margin="12px 0" fontSize="1.1rem">
            {user?.name}
          </Typography>
          <Link to="/" onClick={handleLogout}>
            Đăng xuất
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          ul: {
            padding: "0",
            li: {
              paddingLeft: "18px",
              textAlign: "left",
              fontSize: "1.1rem",
              padding: "8px 0",
              marginBottom: "12px",
              "&.active,&:hover": {
                backgroundColor: "#feeeea",
                a: {
                  color: theme.palette.primary.main,
                },
              },
            },
            a: {
              color: theme.palette.primary.highlightText,
              display: "flex",
              alignItems: "center",
              img: {
                margin: "0 12px",
                width: "22px",
                height: "22px",
                display: "block",
                textAlign: "center",
              },
            },
          },
        }}
      >
        <ul>
          {list_item.map((item, index) => {
            return (
              <li
                onClick={() => {
                  setActive(item.title);
                }}
                className={item.title === active ? "active" : ""}
                key={index}
              >
                <Link to={item.link}>
                  <img
                    src={item.title === active ? item.icon_active : item.icon}
                    alt=""
                  />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Box>
    </Box>
  );
};

export default SidebarUserPage;
