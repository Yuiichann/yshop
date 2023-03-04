import { useEffect, useState } from 'react';
import { AiFillFilter } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import figureApi from '../api/modules/figure.api';
import Breadcumb from '../components/Breadcumb';
import { ProductNotFound } from '../components/Error';
import FilterPrice from '../components/FilterPrice';
import FilterScale from '../components/FilterScale';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import ProductsList from '../components/ProductsList';
import SortSelect from '../components/SortSelect';
import FigureCategorys from '../constants/FigureCategorys.constants';
import SortTypes from '../constants/SortTypes.constants';
import { IFigureResponse } from '../types';

const Category = () => {
  const { category } = useParams(); //get type category
  // main state
  const [productResponse, setProductResonse] = useState<IFigureResponse>();
  const [err, setErr] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  // filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [scaleQuery, setScaleQuery] = useState<string>('');
  const [rangePrice, setRangePrice] = useState<string>('100000,100000000'); // default la 100k -> 100tr
  const [sortBy, setSortBy] = useState(SortTypes[0]);

  //   handle fetch data
  useEffect(() => {
    const fetchProductsData = async () => {
      const { response, error } = await figureApi.getList({
        category: category ? category : '',
        page: currentPage,
        sort: sortBy.value,
        scale: scaleQuery,
        range_price: rangePrice,
      });

      if (error && error.message) {
        setErr(error.message);
        setProductResonse(undefined);
        setIsLoading(false);
        return;
      }

      setProductResonse(response?.data);
      setErr(undefined);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchProductsData();
  }, [category, sortBy, currentPage, scaleQuery, rangePrice]);

  // set page về 1 khi đổi trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (numPage: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(numPage);
  };

  return (
    <section className="mt-24">
      {/* Breadcumb */}
      <Breadcumb
        path={
          category
            ? [
                { label: 'Danh mục', url: '/danh-muc/all' },
                { label: category, url: `/danh-muc/${category}` },
              ]
            : [{ label: 'Danh mục', url: '/danh-muc/all' }]
        }
      />

      <div className="container">
        {/* title category and sort select */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl  uppercase font-bold tracking-widest relative after:absolute after:inset-x-0 after:top-full after:h-[2px] after:bg-primary">
            {FigureCategorys.map((item) =>
              item.value === category ? item.label : null
            )}
            {category === 'all' ? 'Sản phẩm' : null}
          </h1>

          {/* sort listbox */}
          <div>
            <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>

        {/* filter and list product */}
        <div className="flex gap-3">
          {/* filter desktop[] */}
          <div className="hidden md:block md:w-3/12 xl:w-1/5">
            <div className="bg-[#f9f9f9] border rounded-sm">
              <div className="flex items-center justify-center gap-2 border-b-2">
                <AiFillFilter />
                <h3 className="py-2 uppercase text-xl font-medium">Bộ Lọc</h3>
              </div>

              {/* filter scale */}
              <div className="border-b py-3 px-2">
                <FilterScale setScaleQuery={setScaleQuery} />
              </div>

              {/* filter price */}
              <div className="border-b py-3 px-2">
                <FilterPrice setRangePrice={setRangePrice} />
              </div>
            </div>
          </div>

          {/* product List */}
          <div className="flex-1">
            {isLoading ? (
              <Loading />
            ) : err ? (
              <ProductNotFound error={err} />
            ) : (
              productResponse && (
                <>
                  <ProductsList products={productResponse.figures} />
                  {/* Paginate */}
                  <Pagination
                    currentPage={currentPage}
                    pageCount={productResponse.totalPage}
                    onPageChange={handlePageChange}
                  />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
