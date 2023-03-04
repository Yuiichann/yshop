import { Menu, Transition } from '@headlessui/react';
import { memo } from 'react';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { BsCartCheck } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { ImUserCheck } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../api/modules/auth.api';
import { setUser } from '../redux/features/user.slice';
import { AppDispatch, RootState } from '../redux/store';

const AuthDropDown = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    const { response, error } = await authApi.signout();

    if (error && error.message) {
      toast.error(error.message);
    }

    if (response && response.data) {
      toast.success(response.data.message);
      localStorage.removeItem('actkn');
      dispatch(setUser(null));
      navigate('/dang-nhap');
    }
  };

  return (
    <Menu as="div" className="relative z-10 uppercase">
      <Menu.Button className="flex flex-wrap justify-center items-center space-x-2 uppercase hover:text-primary effect">
        <FaUserAlt className="text-xl cursor-pointer" />
        <span>tài khoản</span>
      </Menu.Button>

      <Transition
        enter="transition-all duration-300"
        enterFrom="-translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-t-full"
      >
        <Menu.Items className="absolute md:-left-5 lg:-left-2 flex flex-col capitalize w-40 border shadow-md bg-white rounded-md mt-1 py-1">
          {user ? (
            <>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-2 px-3 py-2 ${
                      active ? 'text-primary' : ''
                    }`}
                  >
                    <FaUserAlt />
                    <span className="text-center">Trang cá nhân</span>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile/don-hang"
                    className={`flex items-center space-x-2 px-3 py-2 ${
                      active ? 'text-primary' : ''
                    }`}
                  >
                    <BsCartCheck />
                    <span className="text-center">Đơn hàng</span>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex items-center space-x-2 px-3 py-2 ${
                      active ? 'text-primary' : ''
                    }`}
                    onClick={handleSignOut}
                  >
                    <BiLogOut />
                    <span>Đăng xuất</span>
                  </button>
                )}
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/dang-nhap"
                    className={`flex items-center space-x-2 px-3 py-2 ${
                      active ? 'text-primary' : ''
                    }`}
                  >
                    <BiLogIn />
                    <span>Đăng nhập</span>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/dang-ky"
                    className={`flex items-center space-x-2 px-3 py-2 ${
                      active ? 'text-primary' : ''
                    }`}
                  >
                    <ImUserCheck />
                    <span>Đăng Ký</span>
                  </Link>
                )}
              </Menu.Item>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default memo(AuthDropDown);
