import { memo, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  collections: string[];
  alt: string;
}

const ImageGallery = ({ collections, alt }: Props) => {
  const [isShowThumb, setIsShowThumb] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsShowThumb(false);
      } else {
        setIsShowThumb(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      showThumbs={isShowThumb}
      showIndicators={false}
    >
      {collections.map((item, index) => (
        <div
          key={index}
          className="h-[400px] lg:h-fit lg:max-h-[550px] flex items-center md:items-start"
        >
          <img src={item} alt={alt} className="shadow-sm" />
        </div>
      ))}
    </Carousel>
  );
};

export default memo(ImageGallery);
