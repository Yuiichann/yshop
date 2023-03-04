import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeBanner from '../constants/HomeBanner.constants';
import { ImageLazyLoading } from './LazyLoading';

const BannerSlider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 3000 }}
      loop={true}
      pagination={{ clickable: true }}
    >
      {HomeBanner.map((banner, index) => (
        <SwiperSlide key={index}>
          <Link to={banner.link} className="flex justify-center">
            <ImageLazyLoading
              src={banner.banner}
              alt={`Home_Banner_${index}`}
              className="w-full h-full"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(BannerSlider);
