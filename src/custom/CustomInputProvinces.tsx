import { Combobox, Transition } from '@headlessui/react';
import React, { memo, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiSelector } from 'react-icons/hi';
import { IDistrictVietnam, IProvinceVietnam, IWardVietNam } from '../types';

interface Props {
  listOptions: IProvinceVietnam[] | IDistrictVietnam[] | IWardVietNam[];

  selected: IProvinceVietnam | IDistrictVietnam | IWardVietNam;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}

const CustomSelect = ({ listOptions, selected, setSelected }: Props) => {
  const [query, setQuery] = useState('');

  const filterOptions =
    query === ''
      ? listOptions
      : listOptions.filter((option) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mb-4">
        {/* input and button show  */}
        <div className="relative">
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="province"
            displayValue={(province: any) => province.name}
            className="p-2 border outline-none w-full rounded-sm shadow-sm focus:border-primary effect"
          />

          <Combobox.Button className="absolute right-0 inset-y-0 px-3 hover:text-primary effect">
            <HiSelector />
          </Combobox.Button>
        </div>

        {/* dropdown */}
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-teal-400 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filterOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Không tìm thấy!
              </div>
            ) : (
              filterOptions.map((option) => (
                <Combobox.Option
                  key={option.codename}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <AiOutlineCheck
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default memo(CustomSelect);
