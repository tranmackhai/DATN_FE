import { Box } from "@mui/material";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const HomeTitle = ({ title, path, content }) => {
  return (
    <Box width="calc(50% - 12.5px)">
      <Box
        textTransform="uppercase"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="24px"
      >
        <b
          style={{
            display: "block",
            flex: "1",
            height: "2px",
            opacity: ".1",
            backgroundColor: "#555555",
          }}
        ></b>
        <Link
          to={path}
          style={{
            fontSize: "1.3rem",
            fontWeight: "500",
            color: "#555555",
            padding: "0 24px",
          }}
        >
          {title}
        </Link>
        <b
          style={{
            display: "block",
            flex: "1",
            height: "2px",
            opacity: ".1",
            backgroundColor: "#555555",
          }}
        ></b>
      </Box>
      <Box display="flex" flexDirection="column" gap="16px">
        {content?.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${path}/${item.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#555555",
                fontWeight: "500",
              }}
            >
              <span className="line_clamp">{item.title}</span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "400",
                  marginTop: "6px",
                }}
              >
                {moment(item.createdAt).format("MM/DD/YYYY")}
              </span>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default HomeTitle;
