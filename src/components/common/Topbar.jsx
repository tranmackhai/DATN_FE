import React from "react";
import Logo from "./Logo";
import { Box, Container, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import iconTopbar from "../../api/modules/iconTopbar.api";
import Navbar from "./Navbar";
import { leftNav, rightNav } from "../../api/modules/category.api";

const Topbar = () => {
  const theme = useTheme();
  return (
    <header
      style={{
        boxShadow: " rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px ",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Container
          disableGutters={true}
          maxWidth="lg"
          sx={{
            padding: "8px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.secondary.contrastText,
              fontWeight: "500",
              textTransform: "uppercase",
              fontSize: "0.8rem",
            }}
          >
            PHÒNG 3, DÃY E10, 450-451 Lê Văn Việt, Phường Tăng Nhơn Phú A, Tp.
            Thủ Đức, TP. Hồ Chí Minh
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {iconTopbar.map((item) => {
              return (
                <Tooltip title={item.title} key={item.id}>
                  <Link
                    to={item.path}
                    style={{
                      color: theme.palette.secondary.contrastText,
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      padding: "0 5px",
                    }}
                  >
                    <i className={item.icon}></i>
                  </Link>
                </Tooltip>
              );
            })}
          </Box>
        </Container>
      </Box>
      <Container disableGutters={true} maxWidth="lg">
        <Box display="flex" alignItems="center">
          <Box width="40%">
            <Navbar justify="flex-start" items={leftNav} />
          </Box>
          <Box width="20%" display="flex" justifyContent="center">
            <Link to="/">
              <Logo />
            </Link>
          </Box>
          <Box width="40%" display="flex">
            <Navbar justify="flex-end" items={rightNav} />
          </Box>
        </Box>
      </Container>
    </header>
  );
};

export default Topbar;
