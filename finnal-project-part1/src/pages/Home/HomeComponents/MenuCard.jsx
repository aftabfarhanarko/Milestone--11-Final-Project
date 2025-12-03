import React, { use } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import top from "../../../assets/customer-top.png";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const MenuCard = ({ reivewPromis }) => {
  const reviews = use(reivewPromis);
  // console.log(reviews);

  return (
    <div>
      <img src={top} className="mx-auto my-8"></img>

      <h1 className="text-3xl font-bold text-secondary  text-center">
        What our customers are sayings
      </h1>
      <p className="text-thried max-w-[420px] mx-auto mt-2  text-center font-medium">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
 <Swiper
  loop={true}
  effect={"coverflow"}
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={3} // Default for large screen
  coverflowEffect={{
    rotate: 30,
    stretch: "50%",
    depth: 200,
    modifier: 1,
    scale: 0.75,
    slideShadows: true,
  }}
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  pagination={{ clickable: true }}
  breakpoints={{
    0: {
      slidesPerView: 1,
      coverflowEffect: {
        rotate: 18,
        stretch: "20%",
        depth: 100,
        scale: 0.95,
      },
    },
    640: {
      slidesPerView: 1.3,
      coverflowEffect: {
        rotate: 22,
        stretch: "30%",
        depth: 140,
        scale: 0.88,
      },
    },
    768: {
      slidesPerView: 1.8,
      coverflowEffect: {
        rotate: 25,
        stretch: "40%",
        depth: 160,
        scale: 0.82,
      },
    },
    1024: {
      slidesPerView: 2.2,
      coverflowEffect: {
        rotate: 28,
        stretch: "45%",
        depth: 180,
        scale: 0.78,
      },
    },
    1280: {
      slidesPerView: 3, // Large screen always 3 slides
      coverflowEffect: {
        rotate: 30,
        stretch: "50%",
        depth: 200,
        scale: 0.75,
      },
    },
  }}
  modules={[EffectCoverflow, Pagination, Autoplay]}
  className="mySwiper mt-12"
>
  {reviews.map((review) => (
    <SwiperSlide key={review.id}>
      <ReviewCard data={review} />
    </SwiperSlide>
  ))}
</Swiper>

    </div>
  );
};

export default MenuCard;
