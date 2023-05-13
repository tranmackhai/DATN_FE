import React from "react";
import { Box, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import NavDrop from "./NavDrop";

const Navbar = ({ justify, items }) => {
  const theme = useTheme();
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
                    fontWeight: "500"
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
                <NavLink
                  to={item.path}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
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
                </NavLink>
                {item.drop ? <NavDrop items={item.drop} /> : <></>}
              </Box>
            );
          })}
        </Box>
      </Container>
    </section>
  );
};

export default Navbar;
