import { memo, useEffect, useRef, useState } from 'react';
import { IoCartSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoApp from '../assets/img/logo.png';
import { RootState } from '../redux/store';
import AuthDropDown from './AuthDropDown';
import HeaderNav from './HeaderNav';
import MenuMobile from './MenuMobile';
import SearchDesktop from './SearchDesktop';
import SearchMobile from './SearchMobile';

let oldScrollY = 0;

const Header = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const headerRef = useRef<HTMLElement | null>(null);

  // kiểm tra hướng scroll của user
  const handleScrollDirection = () => {
    const headerHeight = headerRef.current?.offsetHeight;

    if (window.scrollY > oldScrollY) {
      // dwon
      setIsHeaderFixed(false);
    } else {
      // up
      if (headerHeight && window.scrollY > headerHeight + 400) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    }
    oldScrollY = window.scrollY;
  };

  // handle fixed header when scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScrollDirection);

    return () => window.removeEventListener('scroll', handleScrollDirection);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`bg-white z-20 ${
        isHeaderFixed ? 'fixed top-0 left-0 w-screen animate-top-to-bot' : ''
      } shadow-md`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between ${
            isHeaderFixed
              ? 'h-header-mobile'
              : 'h-header-mobile md:h-header-desktop'
          } md:justify-start`}
        >
          {/* Button click open menu mobile */}
          <MenuMobile />

          {/* logo */}
          <Link to="/" className="block">
            <img
              src={LogoApp}
              alt="yshop-logo"
              className={`w-16 h-16  ${
                isHeaderFixed ? '' : 'md:w-24 md:h-24 lg:w-32 lg:h-32'
              }`}
            />
          </Link>

          {/* nav Desktop*/}
          {/* Gồm: Search, Button cart, User and Header nav */}
          <nav
            className={`flex-1 h-full hidden md:flex flex-col gap-6 ${
              isHeaderFixed ? 'justify-center' : 'justify-end'
            }`}
          >
            <div className="flex w-full md:space-x-2 lg:space-x-4">
              {/* search */}
              <SearchDesktop />

              {/* Button Gio hang va sign in sign out */}
              <div className="flex items-center space-x-4 lg:space-x-8 uppercase">
                {/* button giỏ hàng */}
                <Link
                  to="/gio-hang"
                  className="flex flex-wrap justify-center items-center space-x-2 hover:text-primary effect"
                >
                  <div className="relative">
                    <IoCartSharp className="text-2xl " />

                    {/* số sản phẩm trong giỏ hàng */}
                    {items.length > 0 && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-white">
                          {items.length}
                        </span>
                      </div>
                    )}
                  </div>
                  <span>Giỏ hàng</span>
                </Link>

                {/* Button Link Signin - Signup */}
                {/* Auth_dropdown */}
                <AuthDropDown />
              </div>
            </div>

            {/* không hiện thanh nav khi ở dạng header fixed */}
            {!isHeaderFixed && (
              <div className="">
                <HeaderNav />
              </div>
            )}
          </nav>

          {/* Search Mobile && button cart */}
          <div className="flex md:hidden items-center space-x-2">
            <SearchMobile />

            <Link
              to="/gio-hang"
              className="relative text-2xl p-1 cursor-pointer hover:text-primary effect"
            >
              <IoCartSharp />
              {items.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white">{items.length}</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
