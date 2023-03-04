import { Listbox, Transition } from '@headlessui/react';
import React, { memo } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FaSortAmountDown } from 'react-icons/fa';
import { RiArrowDownSLine } from 'react-icons/ri';
import SortTypes from '../constants/SortTypes.constants';

interface Props {
  sortBy: typeof SortTypes[0];
  setSortBy: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
    }>
  >;
}

const SortSelect = ({ setSortBy, sortBy }: Props) => {
  return (
    <Listbox value={sortBy} onChange={setSortBy}>
      <div className="relative">
        <Listbox.Button className="w-40 md:w-52 border py-2 px-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span>
              <FaSortAmountDown />
            </span>

            <span className="text-14 tracking-wider">Sắp xếp</span>
          </div>

          <RiArrowDownSLine className="text-xl font-bold" />
        </Listbox.Button>

        <Transition>
          <Listbox.Options className="absolute mt-2 max-h-60 overflow-auto scrollbar-thin scrollbar-track-sub-color scrollbar-thumb-primary rounded-md shadow-md z-10 bg-white w-full">
            {SortTypes.map((item) => (
              <Listbox.Option
                key={item.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-primary' : 'text-gray-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span className="line-clamp-1">{item.label}</span>

                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <AiOutlineCheck />
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
  );
};

export default memo(SortSelect);
