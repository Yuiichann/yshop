import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'tippy.js/dist/tippy.css';
import userApi from './api/modules/user.api';
import Footer from './components/Footer';
import Header from './components/Header';
import NavTop from './components/NavTop';
import { setUser } from './redux/features/user.slice';
import { AppDispatch } from './redux/store';
import AppRoutes from './routes/routes';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  // handle login with token
  useEffect(() => {
    const checkUserLogged = async () => {
      const acktn = localStorage.getItem('actkn');

      // kiểm tra access Token có trong local không
      // nếu có là user đã đăng nhập trước đó
      if (acktn) {
        const { response, error } = await userApi.getInfo();

        // nếu xảy ra lỗi ở đây là do refreshToken hết hạn
        // người dùng phải đăng nhập lại
        if (error && error.message) {
          localStorage.removeItem('actkn');
          console.error({ error: 'Not LOGIN!' });
          return;
        }

        // pass thì lấy thông tin user và lưu vào redux
        if (response && response.data) {
          dispatch(setUser(response.data));
        }
      }
    };

    checkUserLogged();
  }, [dispatch]);

  return (
    <>
      <NavTop />
      <Header />

      <main className="">
        <Routes>
          {AppRoutes.map((route) =>
            route.children && route.children.length > 0 ? (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.path}
              >
                {route.children.map((subRoute) => (
                  <Route
                    path={subRoute.path}
                    element={<subRoute.element />}
                    key={subRoute.path}
                  />
                ))}
              </Route>
            ) : (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.path}
              />
            )
          )}
        </Routes>
      </main>

      <Footer />

      <div>
        <ToastContainer
          autoClose={2200}
          hideProgressBar={true}
          transition={Flip}
          limit={4}
          theme="colored"
          newestOnTop={true}
        />
      </div>
    </>
  );
};

export default App;
