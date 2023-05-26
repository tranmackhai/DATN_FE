import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Comment = () => {
  const theme = useTheme();
  const [comment, setComment] = useState("");
  const handleClick = () => {
    console.log(comment);
  };

  return (
    <section className="comment">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: theme.palette.secondary.background,
          padding: "24px",
          marginTop: "24px",
          textAlign: "center",
          textarea: {
            outline: "none",
            color: theme.palette.primary.contrastText,
            width: "100%",
            maxWidth: "100%",
            border: `2px solid ${theme.palette.primary.border}`,
            borderRadius: "4px",
            fontSize: "1rem",
            margin: "12px 0",
            "&:focus": {
              boxShadow: "rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px",
            },
          },
        }}
      >
        <Typography textTransform="uppercase" variant="h6" fontWeight="700">
          Bình Luận
        </Typography>
        <textarea
          rows={6}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          onClick={() => {
            handleClick();
          }}
          style={{
            color: theme.palette.secondary.contrastText,
            fontSize: "1rem",
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "4px",
            fontWeight: "700",
            textTransform: "uppercase",
            width: "120px",
            minHeight: "36px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Phản Hồi
        </button>
      </Box>
    </section>
  );
};

export default Comment;
