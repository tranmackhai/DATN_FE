import React from "react";
import TrainningDetail from "../TrainningDetail/TrainningDetail";
import { universityTrainning } from "../../../api/modules/trainning.api";

const UniversityTrainning = () => {
  return (
    <section className="university-trainning">
      <TrainningDetail
        title="ĐÀO TẠO ĐẠI HỌC"
        content1="Chương trình đào tạo bậc đại học của trường Giao Thông Vận Tải phân
            hiệu TP.HCM có chất lượng giảng dạy cao, được thiết kế nhằm đáp ứng
            nhu cầu ngày càng tăng về nhân lực trong lĩnh vực CNTT."
        content2=" Chương trình đào tạo bộ môn điện tử tại Giao Thông Vận Tải phân hiệu
            TP.HCM bao gồm nhiều môn học cốt lõi, bao gồm lý thuyết lập trình,
            thiết kế web, app, ứng dụng androi, IOS, thiết kế hệ thống dữ liệu
            và các công nghệ liên quan. Sinh viên cũng có cơ hội tiếp cận với
            các thiết bị, công cụ và phần mềm mới nhất để hỗ trợ cho quá trình
            học tập và nghiên cứu của mình."
        subject={universityTrainning}
      />
    </section>
  );
};

export default UniversityTrainning;
