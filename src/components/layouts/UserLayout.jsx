import React, { useEffect, useState } from "react";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import { Link, useLocation } from "react-router-dom";
import SidebarUserPage from "../../pages/UserPage/SideBar/SidebarUserPage";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const UserLayout = ({ children }) => {
  const list_item = [
    {
      active: false,
      icon: "https://res.cloudinary.com/dhypn6jgk/image/upload/v1684833742/IT_UTC2/Icon/acc_user_1_dmrvua.svg",
      icon_active:
        "https://res.cloudinary.com/dhypn6jgk/image/upload/v1684833742/IT_UTC2/Icon/acc_user_1_hover_nmofem.svg",
      title: "Tài khoản của tôi",
      header_title: "Tài khoản",
      link: "/thong-tin-ca-nhan",
    },
    {
      active: false,
      icon: "https://res.cloudinary.com/dhypn6jgk/image/upload/v1684833743/IT_UTC2/Icon/acc_user_3_ip4uvs.svg",
      icon_active:
        "https://res.cloudinary.com/dhypn6jgk/image/upload/v1684833742/IT_UTC2/Icon/acc_user_3_hover_c8kxb8.svg",
      header_title: "Tài khoản",
      title: "Đổi mật khẩu",
      link: "/doi-mat-khau",
    },
    {
      active: false,
      icon: "https://res.cloudinary.com/dhypn6jgk/image/upload/v1685849081/IT_UTC2/Icon/acc_user_2_uv1ahp.svg",
      icon_active:
        "https://res.cloudinary.com/dhypn6jgk/image/upload/v1685849062/IT_UTC2/Icon/acc_user_2_hover_try0ri.svg",
      header_title: "Tài khoản",
      title: "Bài viết của tôi",
      link: "/bai-viet-cua-toi",
    },
  ];
  const list_item2 = [
    {
      active: false,
      icon: "https://res.cloudinary.com/dhypn6jgk/image/upload/v1684833742/IT_UTC2/Icon/acc_user_1_dmrvua.svg",
      icon_active:
        "https://res.cloudinary.com/dhypn6jgk/image/upload/v1684833742/IT_UTC2/Icon/acc_user_1_hover_nmofem.svg",
      title: "Tài khoản của tôi",
      header_title: "Tài khoản",
      link: "/thong-tin-ca-nhan",
    },
    {
      active: false,
      icon: "https://res.cloudinary.com/dhypn6jgk/image/upload/v1684833743/IT_UTC2/Icon/acc_user_3_ip4uvs.svg",
      icon_active:
        "https://res.cloudinary.com/dhypn6jgk/image/upload/v1684833742/IT_UTC2/Icon/acc_user_3_hover_c8kxb8.svg",
      header_title: "Tài khoản",
      title: "Đổi mật khẩu",
      link: "/doi-mat-khau",
    },
  ];

  const theme = useTheme();
  const location = useLocation();
  const [active, setActive] = useState("");
  useEffect(() => {
    const item = list_item.find((item) => item.link === location.pathname);
    if (item) {
      setActive(item.title);
    }
  }, [location.pathname]);
  return (
    <section className="user-layout">
      <Topbar />
      <Box>
        <Box
          sx={{
            textAlign: "center",
            padding: "46px 0 18px 0",
            backgroundColor: "#f5f5f5",
            fontSize: "1.2rem",
          }}
        >
          <Box
            sx={{
              fontWeight: "400",
              fontSize: "1.2rem",
              a: {
                color: theme.palette.primary.highlightText,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <Link to="/">Trang chủ</Link>
            <span style={{ margin: "0 6px" }}>/</span>
            <span style={{ color: theme.palette.primary.main }}>{active}</span>
          </Box>
          <Typography
            variant="h5"
            textTransform="uppercase"
            fontWeight="600"
            padding="12px 0"
          >
            {list_item.find((item) => item.title === active)?.header_title}
          </Typography>
          <Container disableGutters={true} maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <SidebarUserPage
                  list_item={list_item}
                  list_item2={list_item2}
                  active={active}
                  setActive={setActive}
                />
              </Grid>
              <Grid item xs={9}>
                {children}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </section>
  );
};

export default UserLayout;
