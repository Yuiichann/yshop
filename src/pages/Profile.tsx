import { AiOutlineEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { ImageLazyLoading } from '../components/LazyLoading';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { RootState } from '../redux/store';
import { BsCardChecklist } from 'react-icons/bs';
import { MdOutlineModeEditOutline } from 'react-icons/md';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) return <></>;

  return (
    <ProtectedLayout>
      <section className="mt-12">
        <div className="container">
          {/* div tong */}
          <div>
            {/* thanh top */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <ImageLazyLoading
                  src={user.avatar}
                  alt={user.username}
                  className="w-14 h-14 rounded-full border-2 p-1"
                />
                <div>
                  <h1>{user.username}</h1>
                  <Link
                    to="/profile"
                    className="text-14 italic text-sub-color flex items-center gap-1 hover:text-[#999999] effect"
                  >
                    <span>
                      <AiOutlineEdit />
                    </span>
                    Sữa hồ sơ
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/profile/don-hang"
                  className="btn flex items-center gap-1"
                >
                  <BsCardChecklist />
                  <span>Đơn của bạn</span>
                </Link>
                <Link
                  to="/profile/doi-mat-khau"
                  className="btn-secondary flex items-center gap-1"
                >
                  <MdOutlineModeEditOutline />
                  <span>Đổi mật khẩu</span>
                </Link>
              </div>
            </div>

            <hr className="mb-4" />

            {/* main content */}
            {/* editprofile | change password | my order */}
            <Outlet />
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
};

export default Profile;
