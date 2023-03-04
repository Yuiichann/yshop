import Category from '../pages/Category';
import ChangePassword from '../pages/ChangePassword';
import EditProfile from '../pages/EditProfile';
import Home from '../pages/Home';
import Introduce from '../pages/Introduce';
import MyOrder from '../pages/MyOrder';
import Payment from '../pages/Payment';
import ProductDetail from '../pages/ProductDetail';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import ShoppingCart from '../pages/ShoppingCart';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

interface RouteProps {
  label: string;
  path: string;
  element: () => JSX.Element;
  children?: RouteProps[];
}

const AppRoutes: RouteProps[] = [
  {
    label: 'Trang chủ',
    path: '/',
    element: Home,
  },
  {
    label: 'Đăng nhập',
    path: '/dang-nhap',
    element: SignIn,
  },
  {
    label: 'Đăng ký',
    path: '/dang-ky',
    element: SignUp,
  },
  {
    label: 'Giới thiệu',
    path: '/gioi-thieu',
    element: Introduce,
  },
  {
    label: 'Danh muc sản phẩm',
    path: '/danh-muc/:category',
    element: Category,
  },
  {
    label: 'Tìm kiếm sản phẩm',
    path: '/tim-kiem',
    element: Search,
  },
  {
    label: 'Chi tiết sản phẩm',
    path: '/san-pham/:slug',
    element: ProductDetail,
  },
  {
    label: 'Giỏ hàng',
    path: '/gio-hang',
    element: ShoppingCart,
  },

  // protected route
  {
    label: 'Thông tin người dùng',
    path: '/profile',
    element: Profile,
    children: [
      {
        label: 'Sữa Profile',
        path: '',
        element: EditProfile,
      },
      {
        label: 'Đơn hàng của bạn',
        path: 'don-hang',
        element: MyOrder,
      },
      {
        label: 'Đổi mật khẩu',
        path: 'doi-mat-khau',
        element: ChangePassword,
      },
    ],
  },
  {
    label: 'Thanh toán đơn hàng',
    path: '/thanh-toan',
    element: Payment,
  },
];

export default AppRoutes;
