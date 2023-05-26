import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { setAccount } from "../../../redux/features/accountSlice";

const SidebarUserPage = ({ list_item, active, setActive }) => {
  const user = useSelector((state) => state.account.account);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const theme = useTheme();
  const handleLogout = async () => {
    // try {
    //   const res = await apiLogout();
    //   if (res.message === "Đăng xuất thành công") {
    //     dispatch(authAction.login({ user: null, accessToken: "" }));
    //     navigate("/");
    //   }
    // } catch (error) {}
  };
  return (
    <section className="sidebar-user_page">
      <Box
        sx={{
          minHeight: "472px",
          backgroundColor: "#fff",
          borderRadius: "4px",
          padding: "0",
          textAlign: "center",
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
              Trần Mặc Khải
            </Typography>
            <Link to="/" onClick={() => handleLogout(dispatch(setAccount(null)))}>
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
    </section>
  );
};

export default SidebarUserPage;
