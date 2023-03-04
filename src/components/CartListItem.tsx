import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ICart } from '../types';
import formatPrice from '../utils/formatPrice';
import { HiOutlineTrash } from 'react-icons/hi';
import Tippy from '@tippyjs/react';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { removeCart, updateQuantity } from '../redux/features/cart.slice';
import { toast } from 'react-toastify';

interface Props {
  cart: ICart;
  isOutStock: boolean;
}

const CartListItem = ({ cart, isOutStock }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveCart = () => {
    dispatch(removeCart(cart.figure.id));
    toast.success('Đã xóa khỏi giỏ hàng.');
  };

  const handleIncrementQuantity = () => {
    if (cart.quantity >= 10) {
      toast.error('Giới hạn sản phẩm là 10');
      return;
    }

    dispatch(
      updateQuantity({ id: cart.figure.id, quantity: cart.quantity + 1 })
    );
  };

  const handleDecrementQuantity = () => {
    if (cart.quantity === 1) {
      return;
    }

    dispatch(
      updateQuantity({ id: cart.figure.id, quantity: cart.quantity - 1 })
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {/* info cart */}
      <div className="flex gap-2">
        <Link
          to={`/san-pham/${cart.figure.slug}`}
          className="w-3/12 md:w-4/12 lg:w-3/12 xl:w-2/12"
        >
          <img
            src={
              cart.figure.thumbnail ||
              'https://rare-gallery.com/mocahbig/394707-wallpaper-error-404-anime-4k-hd.jpg'
            }
            alt={cart.figure.slug}
            className="w-full h-36 md:h-40 object-cover shadow-md"
          />
        </Link>

        <div className="flex-1 my-1">
          {/* title and button remove */}{' '}
          <div className="flex items-center justify-between">
            <Link
              to={`/san-pham/${cart.figure.slug}`}
              className="line-clamp-1 hover:text-primary effect"
            >
              {cart.figure.title}
            </Link>

            <Tippy content="Xóa sản phẩm khỏi giỏ hàng" animation="fade">
              <button
                className="p-2 text-xl hover:text-primary effect"
                onClick={handleRemoveCart}
              >
                <HiOutlineTrash />
              </button>
            </Tippy>
          </div>
          {/* button increment / decrement quantity */}
          <div className="flex items-center gap-2">
            {/* Giảm */}
            <Tippy content="Giảm" animation="fade">
              <button
                className="p-2 bg-[#efefef] border border-[#efefef] disabled:opacity-50"
                onClick={handleDecrementQuantity}
                disabled={cart.quantity === 1}
              >
                <GrFormSubtract />
              </button>
            </Tippy>

            <span className="p-2 select-none">{cart.quantity}</span>

            {/* Tăng */}
            <Tippy content="Tăng" animation="fade">
              <button
                className="p-2 bg-[#efefef] border border-[#efefef] disabled:opacity-50"
                onClick={handleIncrementQuantity}
                disabled={cart.quantity === 10}
              >
                <GrFormAdd />
              </button>
            </Tippy>
          </div>
          {/* tiền của figure */}
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="font-medium">
              {formatPrice(cart.figure.price)}
            </span>

            {cart.figure.discount > 0 && (
              <div className="relative text-sub-color after:absolute after:inset-x-0 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-sub-color">
                <span>{formatPrice(cart.figure.oldPrice)}</span>
              </div>
            )}
          </div>
          {/* error out-stock */}
          {isOutStock && (
            <div className="mt-1">
              {cart.figure.in_stock !== 0 ? (
                <span className="text-14 text-red-500 italic">
                  Sản phẩm này chỉ còn {cart.figure.in_stock} sp.
                </span>
              ) : (
                <span className="text-14 text-red-500 italic">
                  Sản phẩm đã hết hàng!!!
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* thành tiền của cart */}
      <div className="flex justify-between items-center gap-2">
        <h6 className="font-semibold tracking-wide">Thành tiền: </h6>
        <span className="text-red-500 font-medium">
          {formatPrice(cart.quantity * cart.figure.price)}
        </span>
      </div>
    </div>
  );
};

export default memo(CartListItem);
