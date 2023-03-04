import Tippy from '@tippyjs/react';
import { memo, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { addCart } from '../redux/features/cart.slice';
import { AppDispatch } from '../redux/store';
import { IFigureItem } from '../types';
import formatPrice from '../utils/formatPrice';
import { ImageLazyLoading } from './LazyLoading';

interface Props {
  products: IFigureItem[];
}

const FigureSlider = ({ products }: Props) => {
  const [silderPerView, setSlidePerView] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // add cart
  const handleAddToCart = (product: IFigureItem) => {
    if (product.in_stock === 0) {
      toast.error('Sản phẩm đã hết hàng');
      return;
    }

    dispatch(addCart({ figure: product, quantity: 1 }));
  };

  // mua hàng liền
  const handlePurchaseCart = (product: IFigureItem) => {
    setIsLoading(true);

    if (product.in_stock === 0) {
      toast.error('Sản phẩm đã hết hàng');
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      navigate('/thanh-toan', { state: product });
    }, 600);
  };

  // set item per view responsive
  useEffect(() => {
    const handleResize = () => {
      const bodyWidth = window.innerWidth;

      if (bodyWidth <= 768) {
        setSlidePerView(3);
      } else {
        if (bodyWidth <= 1024) {
          setSlidePerView(4);
        } else {
          setSlidePerView(5);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    // chạy 1 lần khi mount để check thiết bị
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Swiper spaceBetween={10} slidesPerView={silderPerView}>
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="group overflow-hidden">
            {/* Image */}
            <Link
              to={`/san-pham/${product.slug}`}
              className=" flex justify-center relative"
            >
              <ImageLazyLoading
                src={
                  product.thumbnail ||
                  'https://rare-gallery.com/mocahbig/394707-wallpaper-error-404-anime-4k-hd.jpg'
                }
                alt={product.slug}
                className="object-cover w-32 h-40 sm:w-48 sm:h-56 md:w-56 md:h-64 lg:w-72 lg:h-80 rounded-md shadow-md "
              />

              {product.discount > 0 && (
                <div className="absolute top-2 left-0 flex w-12 items-center justify-center bg-red-500 text-white rounded-r-lg">
                  <span className="text-14">-{product.discount}%</span>
                </div>
              )}
            </Link>

            {/* title and price */}
            <div className="mt-1">
              <Link
                to={`/san-pham/${product.slug}`}
                className="line-clamp-1 hover:text-primary effect"
              >
                {product.title}
              </Link>

              {/* discount and old Pirce */}
              {product.discount > 0 && (
                <div className="flex items-center gap-2 cursor-default">
                  <p className="relative inline-block after:absolute after:inset-x-0 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-black text-sub-color">
                    {formatPrice(product.oldPrice)}
                  </p>
                </div>
              )}

              <p className="text-red-500 font-semibold cursor-default">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* button */}
            <div className="hidden md:flex items-center justify-center gap-6 mt-2 translate-y-full group-hover:translate-y-0 effect">
              <Tippy content="Mua ngay" animation="scale">
                <button
                  className="p-3 border border-sub-color rounded-full hover:text-primary hover:border-primary effect"
                  onClick={() => handlePurchaseCart(product)}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-primary" />
                  ) : (
                    <BsCartCheck />
                  )}
                </button>
              </Tippy>

              <Tippy content="Thêm vào giỏ hàng" animation="scale">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-3 border border-sub-color rounded-full hover:text-primary hover:border-primary effect"
                >
                  <FaCartPlus />
                </button>
              </Tippy>
            </div>

            {/* button mobile */}
            <div className="flex md:hidden items-center justify-center gap-3 mt-2">
              <Tippy content="Mua ngay" animation="scale">
                <button className="p-3 border border-sub-color rounded-full hover:text-primary hover:border-primary effect">
                  <BsCartCheck />
                </button>
              </Tippy>

              <Tippy content="Thêm vào giỏ hàng" animation="scale">
                <button
                  className="p-3 border border-sub-color rounded-full hover:text-primary hover:border-primary effect"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaCartPlus />
                </button>
              </Tippy>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(FigureSlider);
