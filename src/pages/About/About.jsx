import { useTheme } from "@emotion/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import TitlePersonnel from "./TitlePersonnel";
import Personnel from "./Personnel";
import OverviewPractice from "./OverviewPractice";
import { teachers, visitingLecturer } from "../../api/modules/teachers.api";

const About = () => {
  const theme = useTheme();
  return (
    <section className="about">
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "500px",
            backgroundImage: `url("https://res.cloudinary.com/dhypn6jgk/image/upload/v1682929417/IT_UTC2/Logo_Banner/n_news-generic_djtmgo.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            position: "relative",
          }}
        >
          <Box
            position="absolute"
            textAlign="center"
            top="50%"
            left="50%"
            color={theme.palette.secondary.contrastText}
            sx={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography fontWeight="500" variant="h2" textTransform="uppercase">
              GIỚI THIỆU
            </Typography>
            <Typography
              fontWeight="500"
              textTransform="uppercase"
              padding="18px 0"
            >
              BỘ MÔN CÔNG NGHỆ THÔNG TIN
            </Typography>
            <Typography fontWeight="500" textTransform="uppercase">
              KHOA CÔNG NGHỆ THÔNG TIN TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI PHÂN
              HIỆU TP.HCM
            </Typography>
          </Box>
        </Box>
      </Box>
      <Container disableGutters={true} maxWidth="lg">
        <Box color="#555" textAlign="center" margin="32px 0">
          <Typography
            variant="h6"
            textTransform="uppercase"
            fontWeight="700"
            marginBottom="12px"
          >
            BỘ MÔN CÔNG NGHỆ THÔNG TIN
          </Typography>
          <Typography>
            Bộ môn Công nghệ thông tin Cơ sở II được thành lập ngày 8/2016 ngay
            sau khi Cơ sở II Trường Đại học GTVT được nâng cấp thành Phân hiệu
            tại TP.HCM theo quyết định của Bộ trưởng Bộ GD&ĐT. Hiện nay Bộ môn
            CNTT có nhiệm vụ quản lý và giảng dạy 51 học phần của ngành CNTT, 03
            học phần cho các chuyên ngành khác tại Phân hiệu TP. HCM.
          </Typography>
          <Typography margin="12px 0">
            Bộ môn trực tiếp quản lý và đào tạo các Kỹ sư chuyên ngành Hệ thống
            thông tin, chuyên ngành Mạng máy tính, chuyên ngành Công nghệ Phần
            mềm và chuyên ngành Khoa học máy tính. Các hệ đào tạo: chính quy,
            vừa làm vừa học, bằng 2, liên thông. Nghiên cứu Khoa học: Tham gia
            đề tài nghiên cứu khoa học các cấp, công bố các bài báo khoa học
            trên các Tạp chí chuyên ngành.
          </Typography>
          <Typography>
            Cơ hữu tại Phân hiệu: Bộ môn Công nghệ thông tin tại Phân hiệu gồm
            có 5 giảng viên, trong đó có 100% giảng viên có trình độ trên đại
            học gồm 04 Thạc sĩ, 01 Nghiên cứu sinh.
          </Typography>
          <div
            style={{
              height: "3px",
              backgroundColor: "rgba(0,0,0,.1)",
              margin: "18px auto",
              width: "30px",
            }}
          ></div>
        </Box>
      </Container>
      <Container disableGutters={true} maxWidth="lg">
        <Box textAlign="center" color="#555">
          <Typography
            fontSize="1.8rem"
            fontWeight="700"
            textTransform="uppercase"
          >
            VỀ CHÚNG TÔI
          </Typography>
        </Box>
        <section className="infor-chief">
          <TitlePersonnel title="Trưởng bộ môn" />
          <Personnel
            img="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682937697/IT_UTC2/Logo_Banner/21192316_981062065367932_1800189375131652374_n_fube0o.jpg"
            name="THS.Trần Phong Nhã"
            facebook="https://www.facebook.com/nhatran2502"
            email="mailto:tpnha@utc2.edu.vn"
          />
        </section>
        <section className="infor-teachers">
          <TitlePersonnel title="Cán bộ giảng dạy" />
          <Box display="flex" alignItems="center" justifyContent="center">
            {teachers.map((item, index) => {
              return (
                <Personnel
                  key={index}
                  img={item.img}
                  name={item.name}
                  facebook={item.facebook}
                  email={item.email}
                />
              );
            })}
          </Box>
        </section>
        <section className="infor-visiting_lecturer">
          <TitlePersonnel title="Cán bộ thỉnh giảng" />
          <Box display="flex" alignItems="center" justifyContent="center">
            {visitingLecturer.map((item, index) => {
              return (
                <Personnel
                  key={index}
                  img={item.img}
                  name={item.name}
                  email={item.email}
                />
              );
            })}
          </Box>
        </section>
        <Box textAlign="center" color="#555">
          <Typography
            fontSize="1.8rem"
            fontWeight="700"
            textTransform="uppercase"
            margin="24px 0"
          >
            Phòng thực hành
          </Typography>
        </Box>
      </Container>
      <OverviewPractice
        flexDirection="row-reverse"
        background={theme.palette.secondary.background}
        title="PHÒNG THỰC HÀNH 1"
        image="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682955932/IT_UTC2/Logo_Banner/104491802_1793819080756630_7402820435464893201_n.jpg_tns6ae.jpg"
        content1="Phòng 201 tòa nhà E7"
        content2="Giảng viên phụ trách: Trần Thị Dung"
        content3="Phục vụ các môn học lập trình C/C++"
      />
      <OverviewPractice
        title="PHÒNG THỰC HÀNH 2"
        image="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682956755/IT_UTC2/Logo_Banner/96819946_10206914239609965_5088136966889799680_n.jpg_plmhxr.jpg"
        content1="Phòng 202 tòa nhà E7"
        content2="Giảng viên phụ trách: "
        content3="Phục vụ các môn học lập trình Java C#"
      />
    </section>
  );
};

export default About;
