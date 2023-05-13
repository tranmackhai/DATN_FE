import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const TrainningDetail = ({ title, content1, content2, subject }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        textAlign="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography
          variant="h5"
          color={theme.palette.primary.hightlightText}
          fontWeight={700}
          textTransform="uppercase"
          marginBottom="48px"
        >
          {title}
        </Typography>
        <Box textAlign="start">
          <Typography padding="12px 0">{content1}</Typography>
          <Typography>{content2}</Typography>
        </Box>
        <Box
          margin="24px 0"
          sx={{
            table: {
              borderCollapse: "separate",
              borderSpacing: "0",
            },
            "tbody tr": {
              "&:nth-of-type(2n+1)": {
                background: "#f0f0f0",
              },
            },
            "tbody tr td": {
              padding: "8px 0",
            },
          }}
        >
          <table>
            <thead>
              <tr>
                <th>
                  <strong>MÃ MÔN HỌC</strong>
                </th>
                <th>
                  <strong>TÊN MÔN HỌC</strong>
                </th>
                <th>SỐ TÍN CHỈ</th>
              </tr>
            </thead>
            <tbody>
              {subject.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.creditsNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>
      {/* <div
        style={{
          alignSelf: "stretch",
          opacity: "0.2",
          width: "1px",
          backgroundColor: "#555",
        }}
      ></div> */}
    </Box>
  );
};

export default TrainningDetail;
