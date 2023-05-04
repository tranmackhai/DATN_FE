import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const Banner = () => {
  const theme = useTheme();
  return (
    <section className="section-banner">
      <Box sx={{
        padding: "12px",
        backgroundColor: theme.palette.secondary.main
      }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          <SwiperSlide>
            <Box>
              <Link
                to="#"
                style={{
                  display: "block",
                  height: "500px",
                }}
              >
                <img
                  src={
                    "https://res.cloudinary.com/dhypn6jgk/image/upload/v1682666111/IT_UTC2/Logo_Banner/343747645_465747852400946_6440733867970833835_n.jpg_siptkl.jpg"
                  }
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Link>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box>
              <Link
                to="#"
                style={{
                  display: "block",
                  height: "500px",
                }}
              >
                <img
                  src={
                    "https://res.cloudinary.com/dhypn6jgk/image/upload/v1682501957/IT_UTC2/Logo_Banner/341366275_557595332913054_1996146117141676532_n.png_jdxmnc.png"
                  }
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Link>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </section>
  );
};

export default Banner;
