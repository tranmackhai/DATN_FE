import { useTheme } from "@emotion/react";
import { Box, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavDrop from "./NavDrop";

const Navbar = ({ justify, items }) => {
  const theme = useTheme();
  const user = useSelector((state) => state.account.account);
  // console.log(user)
  return (
    <section className="navbar">
      <Container disableGutters={true} maxWidth="lg">
        <Box
          display="flex"
          justifyContent={justify}
          sx={{
            padding: "0 24px",
          }}
        >
          {items.map((item) => {
            return (
              <Box
                key={item.id}
                sx={{
                  a: {
                    textTransform: "uppercase",
                    position: "relative",
                    margin: "10px",
                    color: theme.palette.primary.contrastText,
                    fontWeight: "500",
                  },
                  "a.active": {
                    color: theme.palette.primary.highlightText,
                  },
                  ".navdrop": {
                    display: "none",
                  },
                  "&:hover .navdrop": {
                    display: "block",
                  },
                  "a:hover": {
                    color: theme.palette.primary.highlightText,
                  },
                }}
              >
                <Link to={item?.path}>
                  {item.title}
                  {item.drop ? (
                    <i
                      className="fa-solid fa-chevron-down"
                      style={{
                        marginLeft: "6px",
                        fontSize: "0.7rem",
                        transform: `translateY(${-3}px)`,
                      }}
                    ></i>
                  ) : (
                    <></>
                  )}
                </Link>
                {item.drop ? <NavDrop items={item.drop} /> : <></>}
                {user?.role === "student" && item.drop2 ? (
                  <NavDrop items={item.drop2} />
                ) : (
                  <></>
                )}
                {user?.role === "recruitment" && item.drop3 ? (
                  <NavDrop items={item.drop3} />
                ) : (
                  <></>
                )}
                {user?.role === "teacher" && item.drop4 ? (
                  <NavDrop items={item.drop4} />
                ) : (
                  <></>
                )}
                {user?.role === "admin" && item.drop4 ? (
                  <NavDrop items={item.drop4} />
                ) : (
                  <></>
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </section>
  );
};

export default Navbar;
