import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import authApi from '../api/modules/auth.api';
import userApi from '../api/modules/user.api';
import CustomInput from '../custom/CustomInput';
import CustomInputPassword from '../custom/CustomInputPassword';
import DisabledLayout from '../layouts/DisabledLayout';
import { setUser } from '../redux/features/user.slice';
import { AppDispatch } from '../redux/store';
import { signInSchema } from '../schema/yup.schema';
import { ISignIn, IUser } from '../types';

const initialValues: ISignIn = {
  username: '',
  password: '',
};

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [errSignIn, setErrSignIn] = useState<string>();

  const handleSubmit = async (
    values: ISignIn,
    actions: FormikHelpers<ISignIn>
  ) => {
    const { response, error } = await authApi.signin(values);

    // logins false
    if (error && error.message) {
      setErrSignIn(error.message);
      actions.setValues({ username: values.username, password: '' });
      actions.setFieldTouched('password', false);
      actions.setSubmitting(false);
    } else {
      // loggin success
      setErrSignIn(undefined);
      const { accessToken } = response?.data;

      localStorage.setItem('actkn', accessToken);

      await handleGetInfoUser();
    }
  };

  // lấy dữ liệu user và lưu vào redux
  const handleGetInfoUser = async () => {
    const { response, error } = await userApi.getInfo();

    if (error && error.message) {
      console.error(error);
      return;
    }

    dispatch(setUser(response?.data as IUser));
  };

  return (
    <DisabledLayout>
      <section
        className="bg-center bg-no-repeat bg-cover relative pb-0 select-none"
        style={{
          backgroundImage:
            'url(https://mohinhfigure.com/wp-content/uploads/2021/08/banner-1....jpeg)',
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-blur"></div>

        <div className="container relative py-48 md:py-32">
          <div className="flex items-center justify-center">
            {/* form */}
            <div className="bg-white rounded-md shadow-md p-8 md:p-12">
              <h1 className="text-center text-2xl font-semibold mb-4 text-main-color">
                Đăng Nhập
              </h1>

              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={signInSchema}
              >
                {(props) => (
                  <Form autoComplete="off" className="w-[280px] md:w-[310px]">
                    <CustomInput
                      type="text"
                      name="username"
                      placeholder="Tên Đăng Nhập..."
                    />

                    <CustomInputPassword
                      name="password"
                      placeholder="Password..."
                    />

                    <button
                      type="submit"
                      className={`uppercase bg-primary w-full py-2 text-white font-medium hover:bg-opacity-80 effect disabled:opacity-80 `}
                      disabled={props.isSubmitting}
                    >
                      {props.isSubmitting ? 'Loading ...' : 'Đăng nhập'}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* alert error! */}

              <div
                className={`text-center text-red-500 italic text-14 mt-4 ${
                  errSignIn ? 'visible' : 'invisible'
                }`}
              >
                <span>{errSignIn || 'Error'}</span>
              </div>

              <div className="mt-6 text-14">
                <p className="mb-2">
                  Không có tài khoản?
                  <Link
                    to="/dang-ky"
                    className="text-primary hover:opacity-80 pl-1"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
                <p>
                  Quên mật khẩu?
                  <Link
                    to="/dang-ky"
                    className="text-primary hover:opacity-80 pl-1"
                  >
                    Khôi phục mật khẩu
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DisabledLayout>
  );
};

export default SignIn;
