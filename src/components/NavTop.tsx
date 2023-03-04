import React, { memo } from 'react';
import Tippy from '@tippyjs/react';
import { IoLocationSharp, IoMailSharp, IoPhonePortrait } from 'react-icons/io5';

const NavTop = () => {
  return (
    <nav className="bg-primary text-white hidden md:block">
      <div className="container">
        <div className="flex items-center justify-between h-8">
          <h1 className="capitalize tracking-widest font-medium text-14">
            Sàn giao dịch Figure chính hãng
          </h1>

          <div className="flex items-center space-x-9">
            <Tippy
              content="194 Trần Bá Giao, phường 5, Gò Vấp, TP.HCM"
              animation="fade"
            >
              <div className="cursor-pointer text-18">
                <IoLocationSharp />
              </div>
            </Tippy>

            <Tippy content="yshopfigure@gmail.com" animation="fade">
              <div className="cursor-pointer text-18">
                <IoMailSharp />
              </div>
            </Tippy>

            <Tippy content="056 339 4585" animation="fade">
              <div className="cursor-pointer text-18">
                <IoPhonePortrait />
              </div>
            </Tippy>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(NavTop);
