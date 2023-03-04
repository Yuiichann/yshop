import Tippy from '@tippyjs/react';
import { memo, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'tippy.js/animations/scale.css';
import { addCart } from '../redux/features/cart.slice';
import { AppDispatch } from '../redux/store';
import { IFigureItem } from '../types';
import formatPrice from '../utils/formatPrice';
import { ComponentLazyLoading } from './LazyLoading';

interface Props {
  product: IFigureItem;
}

const ProductItem = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (product.in_stock === 0) {
      toast.error('Sản phẩm đã hết hàng');
      return;
    }

    dispatch(addCart({ figure: product, quantity: 1 }));
  };

  const handlePurchaseCart = () => {
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

  return (
    <div className="overflow-hidden group">
      {/* thumbnail */}
      <div className="overflow-hidden rounded-md relative">
        <ComponentLazyLoading>
          <Link
            to={`/san-pham/${product.slug}`}
            className="relative block bg-cover bg-center bg-no-repeat pt-[135%] rounded-md shadow-lg overflow-hidden group-hover:scale-110 effect"
            style={{
              backgroundImage: `url(${
                product.thumbnail
                  ? product.thumbnail
                  : 'https://rare-gallery.com/mocahbig/394707-wallpaper-error-404-anime-4k-hd.jpg'
              })`,
            }}
          >
            <div className="absolute inset-0 bg-blur"></div>
          </Link>
        </ComponentLazyLoading>

        {/* discount */}
        {product.discount > 0 && (
          <div className="absolute left-0 top-2 px-2 text-white text-14 bg-red-500 rounded-r-md">
            <span>-{product.discount}%</span>
          </div>
        )}

        {/* het hang */}
        {product.in_stock === 0 && (
          <div className="absolute select-none left-1 bottom-1 flex items-center justify-center p-2 border-4 border-red-500 bg-white shadow-md rounded-md">
            <span className="font-extrabold text-14 tracking-wider text-red-500">
              Hết Hàng
            </span>
          </div>
        )}
      </div>

      {/* detail */}
      <div className="mt-3 md:mt-2 flex flex-col gap-1 md:translate-y-1/2 md:group-hover:translate-y-0 md:effect">
        {/* link title */}
        <div className="text-16 tracking-wide text-primary hover:text-main-color effect">
          <Link to={`/san-pham/${product.slug}`} className="line-clamp-1">
            {product.title}
          </Link>
        </div>

        {/* oldprice - price - discount */}
        <div className="cursor-default flex items-center gap-2 flex-wrap">
          {/* old price */}
          {product.oldPrice > product.price && (
            <div className="relative">
              <span className="text-sub-color">
                {formatPrice(product.oldPrice)}
              </span>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1.5px] bg-red-500"></div>
            </div>
          )}

          {/* main price */}
          <span className="tracking-wider font-medium">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>

      {/* button desktop */}
      <div className="hidden md:flex items-center justify-center gap-6 mt-2 translate-y-full group-hover:translate-y-0 effect">
        <Tippy content="Mua ngay" animation="scale">
          <button
            className="p-3 border border-sub-color rounded-full hover:text-primary hover:border-primary effect"
            onClick={handlePurchaseCart}
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
            onClick={handleAddToCart}
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
            onClick={handleAddToCart}
          >
            <FaCartPlus />
          </button>
        </Tippy>
      </div>
    </div>
  );
};

export default memo(ProductItem);
