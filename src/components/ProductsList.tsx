import { memo } from 'react';
import { IFigureItem } from '../types';
import ProductItem from './ProductItem';

interface Props {
  products: IFigureItem[];
}

const ProductsList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default memo(ProductsList);
