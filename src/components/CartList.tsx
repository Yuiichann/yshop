import { memo } from 'react';
import { ICart } from '../types';
import CartListItem from './CartListItem';

interface Props {
  carts: ICart[];
  productsOutStock: string[];
}

const CartList = ({ carts, productsOutStock }: Props) => {
  const checkOutStock = (figure_id: string) => {
    const current = productsOutStock.find((item) => item === figure_id);

    return current ? true : false;
  };

  return (
    <div className="flex flex-col gap-4 select-none">
      {carts.map((cart) => (
        <CartListItem
          cart={cart}
          key={cart.figure.id}
          isOutStock={checkOutStock(cart.figure.id)}
        />
      ))}
    </div>
  );
};

export default memo(CartList);
