import React, { memo } from 'react';
import {
  BsFacebook,
  BsGoogle,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a]">
      <div className="container hidden md:block">
        {/* giới thiệu */}
        <div className="py-8 my-2 text-[#999999]">
          <h1 className="mb-4 text-18 font-semibold tracking-wide">
            Giới thiệu về YShop
          </h1>
          <div className="flex">
            <div className="flex-1">
              <p>
                Giúp các bạn trẻ Việt Nam dễ dàng tiếp cận với mô hình figure
                Nhật Bản.
              </p>
              <ul className="flex gap-2 mt-2">
                <li>
                  <a
                    href="https://facebook.com"
                    className="p-2 rounded-full block border hover:text-primary hover:border-primary effect"
                  >
                    <BsFacebook />
                  </a>
                </li>

                <li>
                  <a
                    href="https://facebook.com"
                    className="p-2 rounded-full block border hover:text-primary hover:border-primary effect"
                  >
                    <BsTwitter />
                  </a>
                </li>

                <li>
                  <a
                    href="https://facebook.com"
                    className="p-2 rounded-full block border hover:text-primary hover:border-primary effect"
                  >
                    <BsInstagram />
                  </a>
                </li>

                <li>
                  <a
                    href="https://facebook.com"
                    className="p-2 rounded-full block border hover:text-primary hover:border-primary effect"
                  >
                    <BsGoogle />
                  </a>
                </li>

                <li>
                  <a
                    href="https://facebook.com"
                    className="p-2 rounded-full block border hover:text-primary hover:border-primary effect"
                  >
                    <BsYoutube />
                  </a>
                </li>
              </ul>
            </div>

            <ul className="flex-1 flex flex-col gap-2 tracking-wide">
              <li>
                <b>Địa chỉ:</b> 194 Trần Bá Giao, phường 5, Gò Vấp, TP.HCM
              </li>

              <li>
                <b>Điện thoại:</b> 0563394585
              </li>

              <li>
                <b>Email:</b> support@yshop.vn
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-[#999999] my-1 hidden md:block"></div>

      <div className="container">
        <h1 className="text-[#999999] text-14 text-center my-4">
          Copyright © 2023 YShop. Powered by Yct.
        </h1>
      </div>
    </footer>
  );
};

export default memo(Footer);
