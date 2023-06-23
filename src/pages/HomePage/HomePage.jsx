import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import newsApi from "../../api/modules/news.api";
import Banner from "../../components/common/Banner";
import HomeTitle from "./HomeTitle";
import Overview from "./Overview";

const HomePage = () => {
  const [recruitment, setRecruitment] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await newsApi.getAll({
          type: "recruitment",
          p: 1,
          limit: 5,
          isActive: true,
        });
        if (res.status === 200) {
          setRecruitment(res.data.rows);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await newsApi.getAll({
          type: "news",
          p: 1,
          limit: 5,
        });
        if (res.status === 200) {
          setNews(res.data.rows);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const theme = useTheme();
  return (
    <section className="home-page">
      <Banner />
      <Container disableGutters={true} maxWidth="lg">
        <Box display="flex" alignItems="flex-start" marginTop="24px" gap="24px">
          <HomeTitle title="Tin tức" path="/tintuc" content={news} />
          <div
            style={{
              alignSelf: "stretch",
              opacity: "0.2",
              width: "1px",
              backgroundColor: "#555",
            }}
          ></div>
          <HomeTitle
            content={recruitment}
            title="Tuyển dụng"
            path="/tuyendung"
            // align="flex-end"
          />
        </Box>
        <Box>
          <Box
            textTransform="uppercase"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            margin="48px 0 24px 0"
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
            <Typography
              fontSize="2rem"
              fontWeight={600}
              padding="16px"
              color={theme.palette.secondary.main}
            >
              GIỚI THIỆU BỘ MÔN CÔNG NGHỆ THÔNG TIN
            </Typography>
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
        </Box>
      </Container>
      <Overview
        background={theme.palette.secondary.background}
        title="NGHIÊN CỨU KHOA HỌC"
        path="/nckh"
        img="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682842642/IT_UTC2/Logo_Banner/chon-de-tai-nghien-cuu-rat-quan-trong_ra1g7u.jpg"
        content="Bộ môn Công Nghệ Thông Tin tại Đại học Đại học Giao Thông Vận Tải Phân hiệu tại TP. Hồ Chí Minh là một trong những trung tâm nghiên cứu hàng đầu trong lĩnh Công Nghệ Thông Tin. Chúng tôi tập trung vào việc nghiên cứu, phát triển và ứng dụng công nghệ và khoa học để phục vụ cho sự phát triển đất nước. Những nhóm nghiên cứu của chúng tôi đang thực hiện các nghiên cứu về nhiều vấn đề kỹ thuật lý thuyết và thực tiễn, đảm bảo rằng chúng tôi luôn đứng đầu trong việc cập nhật và áp dụng các tiến bộ mới nhất trong lĩnh vực này."
        buttonText="XEM CÁC NGHIÊN CỨU"
      />
      <Overview
        flexDirection="row-reverse"
        background={theme.palette.primary.background}
        title="ĐÀO TẠO"
        path="/daotao"
        img="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682846441/IT_UTC2/Logo_Banner/78626570_10206152947458137_3434988244884783104_n.jpg_phwald.jpg"
        content="Bộ môn Công Nghệ Thông Tin tại Đại học Giao Thông Vận Tải Phân hiệu tại TP. Hồ Chí Minh cung cấp nhiều chương trình đào tạo Đại Học để giúp sinh viên nắm được kiến thức cơ bản và chuyên sâu của ngành Công Nghệ Thông Tin. Mục tiêu của chúng tôi là hỗ trợ sinh viên trở thành những chuyên gia chuyên nghiệp và đáp ứng nhu cầu tuyển dụng trong môi trường toàn cầu. Khi hoàn thành chương trình đào tạo Đại Học, sinh viên sẽ có được kiến thức và kỹ năng nghề nghiệp chuyên nghành để sẵn sàng để bắt đầu sự nghiệp."
        buttonText="XEM CHƯƠNG TRÌNH ĐÀO TẠO"
      />
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "300px",
            backgroundImage: `url("https://res.cloudinary.com/dhypn6jgk/image/upload/v1682848282/IT_UTC2/Logo_Banner/danh-muc-san-pham-cong-nghe-cao-duoc-khuyen-khich-phat-trien_ncwghd.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            position: "relative",
          }}
        >
          <Container>
            <Box
              position="absolute"
              backgroundColor={theme.palette.primary.background}
              padding="36px"
              top="50%"
              sx={{
                transform: "translateY(-50%)",
              }}
            >
              <Typography
                fontWeight="500"
                variant="h3"
                color={theme.palette.primary.contrastText}
              >
                <span
                  style={{
                    color: theme.palette.secondary.main,
                  }}
                >
                  11
                </span>{" "}
                GIẢNG VIÊN
              </Typography>
              <Typography
                fontWeight="500"
                variant="h3"
                color={theme.palette.primary.contrastText}
              >
                <span
                  style={{
                    color: theme.palette.secondary.main,
                  }}
                >
                  120
                </span>{" "}
                SINH VIÊN
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
      <Overview
        background={theme.palette.primary.background}
        title="CHẤT LƯỢNG – HIỆU QUẢ"
        path="/gioithieu"
        img="https://res.cloudinary.com/dhypn6jgk/image/upload/v1682849776/IT_UTC2/Logo_Banner/343471530_6389273281118256_7879825726015711005_n.jpg_sjl42n.jpg"
        content="Bộ môn Công Nghệ Thông tin tại Đại học Giao Thông Vận Tải Phân hiệu tại TP. Hồ Chí Minh là một trung tâm đào tạo, nghiên cứu khoa học và chuyển giao công nghệ hàng đầu tại Việt Nam trong lĩnh vực Công Nghệ Thông tin. Bộ môn đóng vai trò tiên phong và dẫn dắt trong việc phát triển và ứng dụng khoa học công nghệ trong lĩnh vực này. Chúng tôi tự hào cung cấp cho sinh viên những kiến thức chuyên sâu, kỹ năng nghề nghiệp và môi trường học tập tốt nhất để sẵn sàng cho những cơ hội việc làm tốt trong tương lai."
        buttonText="XEM THÊM"
      />
      <Container disableGutters={true} maxWidth="lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.2750790998148!2d106.79288403848689!3d10.845696397326853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527158a0a5b81%3A0xf45c5d34ac580517!2zUGjDom4gaGnhu4d1IFRyxrDhu51uZyDEkOG6oWkgaOG7jWMgR1RWVCB04bqhaSBUcC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1682851576998!5m2!1svi!2s"
          style={{
            width: "100%",
            height: "400px",
            border: "0",
            allowfullscreen: "",
            loading: "lazy",
            referrerpolicy: "no-referrer-when-downgrade",
            margin: "24px 0",
            boxShadow: " rgba(0, 0, 0, 0.32) -3.67394e-16px 2px 8px 0px ",
          }}
        ></iframe>
      </Container>
    </section>
  );
};

export default HomePage;
