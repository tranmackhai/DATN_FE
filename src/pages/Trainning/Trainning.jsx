import React from "react";
import { Box } from "@mui/material";
import OverviewTrainning from "./OverviewTrainning";

const Trainning = () => {
  return (
    <section className="trainning">
      <Box>
        <OverviewTrainning
          bgrImg="https://res.cloudinary.com/dhypn6jgk/image/upload/v1683173527/IT_UTC2/Logo_Banner/cong-nghe-thong-tin-la-gi_nsg4ff.png"
          left="100px"
          title="ĐÀO TẠO ĐẠI HỌC"
          content="Chương trình đào tạo bậc đại học của trường Giao Thông Vận Tải phân hiệu TP.HCM có chất lượng giảng dạy cao, được thiết kế nhằm đáp ứng nhu cầu ngày càng tăng về nhân lực trong lĩnh vực CNTT. Chương trình đào tạo bộ môn CNTT tại trường Giao Thông Vận Tải phân hiệu TP.HCM bao gồm nhiều môn học cốt lõi, bao gồm lý thuyết CNTT, thực hành CNTT, thiết kế website, app, thiết kế hệ thống dữ liệu và các công nghệ liên quan. Sinh viên cũng có cơ hội tiếp cận với các thiết bị, công cụ và phần mềm mới nhất để hỗ trợ cho quá trình học tập và nghiên cứu của mình."
          path="/dao-tao-dai-hoc"
        />
        <OverviewTrainning
          bgrImg="https://res.cloudinary.com/dhypn6jgk/image/upload/v1683173497/IT_UTC2/Logo_Banner/123614392_3569043706494561_399783457296976823_n.jpg_wjn5cn.jpg"
          left="375px"
          title="ĐÀO TẠO sau ĐẠI HỌC"
          content="Chương trình đào tạo bậc đại học của trường Giao Thông Vận Tải phân hiệu TP.HCM có chất lượng giảng dạy cao, được thiết kế nhằm đáp ứng nhu cầu ngày càng tăng về nhân lực trong lĩnh vực CNTT. Chương trình đào tạo bộ môn CNTT tại trường Giao Thông Vận Tải phân hiệu TP.HCM bao gồm nhiều môn học cốt lõi, bao gồm lý thuyết CNTT, thực hành CNTT, thiết kế website, app, thiết kế hệ thống dữ liệu và các công nghệ liên quan. Sinh viên cũng có cơ hội tiếp cận với các thiết bị, công cụ và phần mềm mới nhất để hỗ trợ cho quá trình học tập và nghiên cứu của mình."
          path="/dao-tao-sau-dai-hoc"
        />
      </Box>
    </section>
  );
};

export default Trainning;
