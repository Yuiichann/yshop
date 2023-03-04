import { Listbox, Transition } from '@headlessui/react';
import React, { memo, useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown, MdOutlineSearch } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import figureApi from '../api/modules/figure.api';
import FigureCategorys from '../constants/FigureCategorys.constants';
import { IFigureItem } from '../types/index';
import formatPrice from '../utils/formatPrice';
import { ImageLazyLoading } from './LazyLoading';

const Search = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(FigureCategorys[0]);
  const [keyword, setKeyword] = useState('');
  const [dataPreview, setDataPreview] = useState<IFigureItem[]>();
  const [errSearch, setErrSearch] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  // debounce search -- làm sau
  useEffect(() => {
    setDataPreview(undefined);
    setErrSearch(undefined);
    setIsLoading(true);

    // clear data khi ko có keyword
    if (!keyword) {
      setDataPreview(undefined);
      setErrSearch(undefined);
      setIsLoading(false);
      return;
    }

    const getDataFigure = setTimeout(async () => {
      const { response, error } = await figureApi.getList({
        search: keyword,
        category: selected.value,
      });

      // nếu có lỗi thì return rỗng
      if (error && error.message) {
        setErrSearch(error.message);
        setIsLoading(false);
        return;
      }

      // kiểm tra cho chắc resopnse có tồn tại
      if (response?.data && response.data.figures.length > 0) {
        const figure = response.data.figures as IFigureItem[];
        const newList = figure.slice(0, 5);

        setDataPreview(newList);
        setErrSearch(undefined);
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(getDataFigure);
  }, [keyword, selected]);

  const handleSearch = async () => {
    if (!keyword) {
      toast.warn('Keyword rỗng!');
      return;
    }

    navigate(`/tim-kiem?q=${keyword}&category=${selected.value}`);

    setKeyword('');
  };

  // xử lý nhấn Enter để search
  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-1 items-center md:space-x-2 lg:space-x-4">
      {/* Select category */}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative z-10 sm:w-[100px] md:w-[115px] lg:w-[140px]">
          {/* Button */}
          <Listbox.Button className="relative w-full cursor-default border rounded-lg h-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <MdOutlineKeyboardArrowDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          {/* Dropdown select category */}
          <Transition>
            <Listbox.Options className="absolute mt-1 max-h-60 w-48 overflow-auto scrollbar-none rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {FigureCategorys.map((category, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {category.label}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <AiOutlineCheck
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* Input search */}
      <div className="border shadow-md rounded-lg flex-1 flex items-center lg:max-w-[500px] relative">
        <input
          type="text"
          className="h-10 py-2 px-3 outline-none rounded-lg flex-grow peer"
          placeholder="Tìm kiếm sản phẩm . . ."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handlePressEnter}
        />
        <button
          className="px-3 py-2 text-xl hover:text-orange-400"
          onClick={handleSearch}
        >
          <MdOutlineSearch />
        </button>

        {/* dropdown debounce keyword */}
        <div className="mt-1 hidden peer-focus-within:block hover:block overflow-hidden absolute top-full inset-x-0 bg-white rounded-md shadow-md z-10">
          {/* list san pham data preview */}
          {dataPreview && (
            <ul>
              {dataPreview.map((item, index) => (
                <li
                  key={item.id}
                  className="flex justify-between gap-1 py-2 px-4"
                >
                  <div className="flex-1">
                    <Link
                      to={`/san-pham/${item.slug}`}
                      className="line-clamp-1 hover:text-primary effect"
                    >
                      {item.title}
                    </Link>

                    <div className="flex items-center gap-2 cursor-default">
                      <span className="text-red-500">
                        {formatPrice(item.price)}
                      </span>
                      {item.discount > 0 && (
                        <div className="text-[12px] text-white p-1 rounded-md bg-red-500">
                          <span>-{item.discount}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <ImageLazyLoading
                    src={
                      item.thumbnail ||
                      'https://rare-gallery.com/mocahbig/394707-wallpaper-error-404-anime-4k-hd.jpg'
                    }
                    className="w-10 h-16 object-cover shadow-md rounded-sm"
                    alt={item.slug}
                  />
                </li>
              ))}

              {/* button xem all */}
              <li
                className="py-2 w-full hover:bg-primary hover:text-white effect border-t"
                onClick={handleSearch}
              >
                <button className="w-full">Xem tất cả</button>
              </li>
            </ul>
          )}

          {isLoading && (
            <div className="flex items-center justify-center h-36">
              <span>Loading . . .</span>
            </div>
          )}

          {errSearch && (
            <div className="flex items-center justify-center h-36">
              <span className="text-18 tracking-wide">{errSearch}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Search);
