import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import orderApi from '../api/modules/order.api';
import CartList from '../components/CartList';
import Loading from '../components/Loading';
import { RootState } from '../redux/store';
import formatPrice from '../utils/formatPrice';

const ShoppingCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { total, items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);

  const [productsOutStock, setProductsOutStock] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const handleClickPay = async () => {
    if (!user) {
      toast.info('Vui lòng đăng nhập để tiến hành thanh toán!');
      return;
    }

    const products = items.map((item) => {
      return { figure_id: item.figure.id, quantity: item.quantity };
    });

    const { error } = await orderApi.checkInStock({ products });

    if (error && error.message) {
      toast.error(error.message.msg);
      setProductsOutStock(error.message.products);
    } else {
      setProductsOutStock([]);
    }
  };

  return (
    <section className="mt-12">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <h1 className="text-2xl font-bold text-center my-4">
            Giỏ hàng của bạn
          </h1>

          <div className="flex-col flex lg:flex-row gap-8 md:gap-4">
            <div className="flex-1">
              {/* thanh số lượng */}
              <div className="bg-[#efefef] px-4 py-2 rounded-sm mb-2">
                {items.length > 0 ? (
                  <h1>
                    Bạn đang có
                    <b className="mx-1">{items.length} sản phẩm</b>
                    trong giỏ hàng.
                  </h1>
                ) : (
                  <h1>Giỏ hàng hiện đang rỗng!</h1>
                )}
              </div>

              {/* list cart */}
              <CartList carts={items} productsOutStock={productsOutStock} />
            </div>

            {/* tổng tiền ở đây */}
            <div className="w-full lg:w-4/12 xl:w-3/12 rounded-sm">
              <div className="border-2 p-4 sticky top-52">
                <h1 className="text-xl font-bold mt-4 mb-6 pb-2 border-b">
                  Thông tin đơn hàng
                </h1>

                <div className="flex items-center justify-between my-4 pb-2 border-b">
                  <span className="font-bold text-xl">Tổng tiền:</span>
                  <span className="text-red-500 font-bold">
                    {formatPrice(total)}
                  </span>
                </div>

                <ul className="list-disc pl-6 text-14 text-sub-color my-4 pb-2 border-b">
                  <li className="py-1 tracking-wide">
                    Phí vận chuyển sẽ được tính ở trang thanh toán.
                  </li>
                  <li className="py-1 tracking-wide">
                    Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                  </li>
                </ul>

                <div className="mt-4">
                  <button
                    className="w-full py-2 bg-red-500 font-semibold text-white uppercase tracking-wider disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-80"
                    disabled={items.length === 0}
                    onClick={handleClickPay}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShoppingCart;
