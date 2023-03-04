import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import authApi from '../api/modules/auth.api';
import userApi from '../api/modules/user.api';
import SelectProvinces from '../components/SelectProvinces';
import CustomInput from '../custom/CustomInput';
import CustomInputPassword from '../custom/CustomInputPassword';
import DisabledLayout from '../layouts/DisabledLayout';
import { setUser } from '../redux/features/user.slice';
import { AppDispatch } from '../redux/store';
import { signUpSchema } from '../schema/yup.schema';
import { ISignUp, IUser } from '../types';

const initialValues: ISignUp = {
  username: '',
  password: '',
  confirm_password: '',
  displayName: '',
  email: '',
  phone_number: '',
  detail: '',
  // district: '',
  // province: '',
  // ward: '',
};

const SignUp = () => {
  const [address, setAddress] = useState<{
    province: string;
    district: string;
    ward: string;
  }>({ province: '', district: '', ward: '' });
  const dispatch = useDispatch<AppDispatch>();
  const [errSignUp, setErrSignUp] = useState<string>();

  // handle submit form
  const handleSubmit = async (
    values: ISignUp,
    actions: FormikHelpers<ISignUp>
  ) => {
    const { detail, confirm_password, ...others } = values; // bỏ confirm_password

    const formData = { ...others, address: { ...address, detail } };

    const { response, error } = await authApi.signup(formData);

    if (error && error.message) {
      setErrSignUp(error.message);
      actions.setSubmitting(false);
    } else {
      setErrSignUp(undefined);

      const accessToken = response?.data.accessToken;

      localStorage.setItem('actkn', accessToken);

      await handleGetInfoUser();
    }
  };

  // fetch data user info
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
            'url(https://mohinhfigure.com/wp-content/uploads/2021/08/banner-2..jpeg)',
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-blur"></div>

        <div className="container relative py-32">
          <div className="flex items-center justify-center">
            {/* form */}
            <div className="bg-white rounded-md shadow-md p-8 md:p-12">
              <h1 className="text-center text-2xl font-semibold mb-4 text-main-color">
                Đăng Ký Tài Khoản
              </h1>

              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={signUpSchema}
              >
                {(props) => (
                  <Form autoComplete="off" className="w-[290px] md:w-[450px]">
                    <CustomInput
                      type="text"
                      name="username"
                      placeholder="Username ..."
                      parentClass="mb-8"
                      isShowSpanError={true}
                    />

                    <CustomInputPassword
                      name="password"
                      placeholder="Password..."
                      parentClass="mb-12 md:mb-8"
                      isShowSpanError={true}
                    />

                    <CustomInputPassword
                      name="confirm_password"
                      placeholder="Xác nhận Password..."
                      parentClass="mb-12 md:mb-8"
                      isShowSpanError={true}
                    />

                    <div className="mb-3">
                      <h1 className="text-center text-18 tracking-wide text-primary">
                        Thông tin tài khoản
                      </h1>
                    </div>

                    <CustomInput
                      type="text"
                      name="displayName"
                      placeholder="Tên hiển thị ..."
                      parentClass="mb-8"
                      isShowSpanError={true}
                    />

                    <CustomInput
                      type="email"
                      name="email"
                      placeholder="Email..."
                      parentClass="mb-8"
                      isShowSpanError={true}
                    />

                    <CustomInput
                      type="text"
                      name="phone_number"
                      placeholder="Số điện thoại..."
                      parentClass="mb-8"
                      isShowSpanError={true}
                    />

                    <div className="mb-3">
                      <h1 className="text-center text-18 tracking-wide text-primary">
                        Địa chỉ
                      </h1>
                    </div>

                    {/* select provinces */}
                    <SelectProvinces setAddress={setAddress} />

                    {/* Detail Address */}
                    <CustomInput
                      type="text"
                      name="detail"
                      placeholder="Tên đường, số nhà,..."
                      parentClass="mb-8"
                      isShowSpanError={true}
                    />

                    <button
                      type="submit"
                      className={`uppercase bg-primary w-full py-2 text-white font-medium hover:bg-opacity-80 effect disabled:opacity-80 `}
                      disabled={props.isSubmitting}
                    >
                      {props.isSubmitting ? 'Loading ...' : 'Đăng Ký'}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* alert error! */}
              <div
                className={`text-center text-red-500 italic text-14 mt-4 ${
                  errSignUp ? 'visible' : 'invisible'
                }`}
              >
                <span aria-hidden={true}>{errSignUp || 'Error'}</span>
              </div>

              <div className="mt-4 text-14">
                <p className="mb-2">
                  Đã có tài khoản?
                  <Link
                    to="/dang-nhap"
                    className="text-primary hover:opacity-80 pl-1"
                  >
                    Đăng nhập
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

export default SignUp;
