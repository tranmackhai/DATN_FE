import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const SidebarForum = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textTransform: "uppercase",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "4px",
        marginLeft: "24px",
        padding: "24px 0",
      }}
    >
      <Box>
        <Typography
          textAlign="center"
          variant="h6"
          color={theme.palette.primary.hightlightText}
          fontWeight={700}
        >
          Giới thiệu
        </Typography>
        <div className="separation"></div>
        <Typography
          textTransform="capitalize"
          padding="0 0 24px 16px"
          textAlign="start"
        >
          Bộ môn trực tiếp quản lý và đào tạo các Kỹ sư chuyên ngành Hệ thống
          thông tin, chuyên ngành Mạng máy tính, chuyên ngành Công nghệ Phần mềm
          và chuyên ngành Khoa học máy tính. Các hệ đào tạo: chính quy, vừa làm
          vừa học, bằng 2, liên thông. Nghiên cứu Khoa học: Tham gia đề tài
          nghiên cứu khoa học các cấp, công bố các bài báo khoa học trên các Tạp
          chí chuyên ngành.
        </Typography>
      </Box>
      <Box>
        <Typography
          textAlign="center"
          variant="h6"
          color={theme.palette.primary.hightlightText}
          fontWeight={700}
        >
          Các tin tức mới
        </Typography>
        <div className="separation"></div>
      </Box>
      <Box paddingLeft="16px"></Box>
    </Box>
  );
};

export default SidebarForum;
