import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  username: yup.string().required('Bắt buộc'),
  password: yup.string().required('Bắt buộc'),
});

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]{8,}$/, { message: 'Username có ít nhất 8 kí tự.' })
    .required('Username là bắt buộc'),
  password: yup
    .string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,16}$/, {
      message: 'Password từ 8-16 kí tự, bao gồm kí tự thường, in hoa và số.',
    })
    .required('Password là bắt buộc.'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Mật khẩu không trùng khớp')
    .required('Bắt buộc.'),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email không hợp lệ.' })
    .required('Email là bắt buộc!'),
  phone_number: yup
    .string()
    .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, {
      message: 'Số điện thoại không hợp lệ.',
    })
    .required('Số điện thoại là bắt buộc.'),
  detail: yup.string().required('Bắt buộc.'),
  displayName: yup.string().max(40).required('Bắt buộc.'),
});
