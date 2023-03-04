import { Listbox, Transition } from '@headlessui/react';
import { memo, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import FigureCategorys from '../constants/FigureCategorys.constants';
import { MdOutlineKeyboardArrowDown, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SearchMobile = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(FigureCategorys[0]);
  const [keyword, setKeyword] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // open search
  const handleToogleSearchInput = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // handle search
  const handleSearch = () => {
    if (!keyword) {
      toast.warn('Vui lòng nhập từ khóa!');
      return;
    }

    navigate(`/tim-kiem?q=${keyword}&category=${selected.value}`);

    setKeyword('');
    setIsSearchOpen(false);
  };

  // handle press enter search
  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="text-2xl p-1 cursor-pointer ">
      <MdOutlineSearch
        className="hover:text-primary effect"
        onClick={handleToogleSearchInput}
      />

      {/* searh */}

      <Transition
        as="div"
        show={isSearchOpen}
        enter="transition-all ease-in duration-150"
        enterFrom="-translate-y-1/2 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition-all ease-in-out duration-100"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-1/2 opacity-0"
        className="fixed top-[76px] left-0 w-screen text-16 shadow-md bg-primary"
      >
        <div className="container">
          <div className="flex items-center gap-2 py-2 relative">
            {/* select category */}
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative w-28">
                <Listbox.Button className="w-full bg-white border shadow-md rounded-md flex items-center h-10 py-1 px-2 justify-between">
                  <span className="block truncate">{selected.label}</span>
                  <MdOutlineKeyboardArrowDown />
                </Listbox.Button>

                <Transition>
                  <Listbox.Options className="overflow-hidden absolute mt-3 w-40 bg-white rounded-md shadow-md">
                    {FigureCategorys.map((category) => (
                      <Listbox.Option
                        key={category.value}
                        value={category}
                        className={({ active }) =>
                          `pl-3 py-1 w-full ${
                            active ? 'bg-primary text-white' : ''
                          }`
                        }
                      >
                        {({ selected }) => (
                          <span
                            className={`block truncate ${
                              selected ? 'font-bold' : 'font-normal'
                            }`}
                          >
                            {category.label}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            <div className="flex-1 flex items-center border rounded-md shadow-md bg-white">
              <input
                type="text"
                className="flex-1 w-0 px-3 py-2 h-10 outline-none rounded-md bg-[transparent] "
                placeholder="Tìm kiếm sản phẩm. . ."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handlePressEnter}
              />

              <div
                className="text-2xl p-2 hover:text-primary"
                onClick={handleSearch}
              >
                <MdSearch />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default memo(SearchMobile);
