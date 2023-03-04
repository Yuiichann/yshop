import { useCallback, useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import figureApi from '../api/modules/figure.api';
import { ProductNotFound } from '../components/Error';
import FilterPrice from '../components/FilterPrice';
import FilterScale from '../components/FilterScale';
import Pagination from '../components/Pagination';
import ProductsList from '../components/ProductsList';
import SortSelect from '../components/SortSelect';
import SortTypes from '../constants/SortTypes.constants';
import { IFigureResponse } from '../types';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let keyword = searchParams.get('q');
  let category = searchParams.get('category');

  // main state
  const [productResponse, setProductResonse] = useState<IFigureResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<string>();

  // filter state
  const [scaleQuery, setScaleQuery] = useState<string>('');
  const [rangePrice, setRangePrice] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(SortTypes[0]);

  // fetch data
  useEffect(() => {
    const fetchProductsData = async () => {
      const { response, error } = await figureApi.getList({
        search: keyword ? keyword : '',
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

    // window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
    fetchProductsData();
  }, [keyword, category, currentPage, sortBy, scaleQuery, rangePrice]);

  // reset page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(1);
  }, [keyword, category]);

  const handlePageChange = useCallback((numPage: number) => {
    setCurrentPage(numPage);
  }, []);

  if (!keyword) return <Navigate to="/" />;

  return (
    <section className="mt-12 sm:mt-24">
      <div className="container">
        {/* titlesearh & sort select */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-xl sm:text-2xl  uppercase font-bold tracking-widest relative after:absolute after:inset-x-0 after:top-full after:h-[2px] after:bg-primary">
            Tìm kiếm: <i className="normal-case">{keyword}</i>
          </h1>

          {/* sort listbox */}
          <div>
            <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>

        <div className="flex gap-3">
          {/* filter desktop[] */}
          <div className="hidden md:block md:w-3/12 xl:w-1/5">
            <div className="bg-[#f9f9f9] border rounded-sm">
              <h3 className="text-center py-2 uppercase text-xl font-medium border-b-2">
                Bộ Lọc
              </h3>

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
              <div>Loading . . .</div>
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

export default Search;
