import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuItems from '../constants/MenuItems.constants';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const HeaderNav = () => {
  const location = useLocation();

  return (
    <ul className="flex gap-8 uppercase tracking-wide font-medium text-main-color">
      {MenuItems.map((item) => (
        <li key={item.path} className="relative group">
          <Link
            to={item.path}
            className={`block relative pb-1 ${
              item.children ? 'flex items-center' : ''
            } ${
              location.pathname === item.path
                ? 'after:w-full text-black font-semibold'
                : 'after:w-0'
            } hover:text-black hover:after:w-full after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:bg-primary after:effect`}
          >
            {item.label}
            {item.children && <MdOutlineKeyboardArrowDown className="ml-2" />}
          </Link>

          {item.children && (
            <div className="absolute h-0 top-full mt-1 left-0 overflow-y-hidden group-hover:h-72 effect">
              <ul className="bg-primary capitalize font-normal w-52 rounded-md shadow-md text-white">
                {item.children.map((subCategory, index) => (
                  <li
                    key={subCategory.path}
                    className={`${
                      index + 1 === item.children?.length ? '' : 'border-b'
                    }`}
                  >
                    <Link
                      to={`/danh-muc${subCategory.path}`}
                      className="block pl-3 py-2 hover:text-black effect"
                    >
                      {subCategory.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default memo(HeaderNav);
