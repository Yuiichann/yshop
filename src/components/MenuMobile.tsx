import { Menu, Transition } from '@headlessui/react';
import { memo, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authApi from '../api/modules/auth.api';
import MenuItems from '../constants/MenuItems.constants';
import { setUser } from '../redux/features/user.slice';
import { AppDispatch, RootState } from '../redux/store';

const MenuMobile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuMobileOpen(!isMenuMobileOpen);
  };

  const handleSignOut = async () => {
    await authApi.signout();

    dispatch(setUser(null));
  };

  return (
    <div className="block md:hidden">
      <button className="p-2 text-32" onClick={handleToggleMenu}>
        <HiMenu />
      </button>

      <Transition show={isMenuMobileOpen}>
        <div className="fixed top-0 left-0 h-screen w-screen z-10">
          {/* Overlay */}
          <div
            className="absolute top-0 left-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)] cursor-pointer"
            onClick={handleToggleMenu}
          >
            <button className="absolute top-0 right-0 p-2 text-3xl text-white">
              <AiOutlineClose />
            </button>
          </div>

          {/* Menu Mobile */}
          <div className="absolute top-0 left-0 h-full w-7/12 bg-white z-20 animate-goto">
            <ul className="py-8 text-main-color h-full">
              {/* nếu có children thì render button, còn lại render link  */}
              {MenuItems.map((item) => (
                <li key={item.path} className="border-b-2">
                  {item.children ? (
                    <div>
                      <Menu as="div">
                        <div>
                          <Menu.Button className="flex items-center justify-between pl-4 py-4 uppercase w-full hover:text-primary">
                            <span>{item.label}</span>
                            <MdOutlineKeyboardArrowDown className="mr-4 text-2xl" />
                          </Menu.Button>

                          <Transition
                            enter="transition-all ease-in duration-200"
                            enterFrom="opacity-50"
                            enterTo="opacity-100"
                          >
                            <Menu.Items className="flex flex-col">
                              {item.children.map((subMenu) => (
                                <Menu.Item key={subMenu.path}>
                                  {({ active }) => (
                                    <Link
                                      to={`/danh-muc${subMenu.path}`}
                                      className={`capitalize py-2 pl-10 relative after:absolute after:w-2 after:h-[1.5px] after:top-1/2 after:-translate-y-1/2 after:left-5 after:bg-black hover:after:bg-primary ${
                                        active ? 'text-primary' : ''
                                      }`}
                                      onClick={handleToggleMenu}
                                    >
                                      {subMenu.label}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </div>
                      </Menu>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block py-4 pl-4 uppercase tracking-wider hover:text-primary $"
                      onClick={handleToggleMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}

              {/* button signin/signout/signup */}
              {!user ? (
                <>
                  <li className="border-b-2">
                    <Link
                      to="/dang-nhap"
                      onClick={handleToggleMenu}
                      className="block font-semibold py-4 pl-4 uppercase tracking-wider hover:text-primary"
                    >
                      Đăng Nhập
                    </Link>
                  </li>
                  <li className="border-b-2">
                    <Link
                      to="/dang-ky"
                      onClick={handleToggleMenu}
                      className="block font-semibold py-4 pl-4 uppercase tracking-wider hover:text-primary"
                    >
                      Đăng ký
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="border-b-2 self-start">
                    <button
                      onClick={handleSignOut}
                      className="block font-semibold py-4 pl-4 uppercase tracking-wider hover:text-primary"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default memo(MenuMobile);
