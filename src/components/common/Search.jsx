import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Fade, Popper } from "@mui/material";

const Search = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
    // console.log(event.currentTarget);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "spring-popper" : undefined;
  return (
    <Box>
      <Button
        variant="contained"
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          maxWidth: "12px",
          padding: "4px",
          color: theme.palette.primary.highlightText,
          ":hover": {
            backgroundColor: "transparent",
            boxShadow: 0,
          },
        }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
      <Popper
        placement="bottom-start"
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{
          zIndex: 1,
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box
              sx={{
                marginTop: "8px",
                backgroundColor: theme.palette.secondary.contrastText,
                borderRadius: "4px",
                boxShadow: "rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px",
                padding: "24px 18px",
                minWidth: "320px",
              }}
            >
              <input
                type="text"
                spellCheck="false"
                placeholder="Bạn cần tìm gì?"
                name={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "8px",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  border: "0.5px solid #ddd",
                  outline: "none",
                  fontSize: "1rem",
                  paddingLeft: "12px",
                  minHeight: "30px",
                  color: theme.palette.primary.highlightText,
                }}
              />
              <button
                style={{
                  color: theme.palette.secondary.contrastText,
                  fontSize: "1rem",
                  backgroundColor: theme.palette.primary.main,
                  width: "50px",
                  minHeight: "36px",
                  border: "none",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default Search;
