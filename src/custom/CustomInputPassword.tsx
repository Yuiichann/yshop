import { useField } from 'formik';
import { memo, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface Props {
  placeholder: string;
  name: string;
  isShowSpanError?: boolean;
  parentClass?: string;
}

const CustomInputPassword = (props: Props) => {
  const { parentClass, isShowSpanError, ...inputProps } = props;
  const [field, meta] = useField(inputProps);
  const [isShowPwd, setIsShowPwd] = useState(false);

  return (
    <div
      className={`relative mb-4 flex items-center gap-4 p-2 border outline-none w-full rounded-sm shadow-sm focus-within:border-primary effect ${
        meta.error && meta.touched && 'border-red-600'
      } ${parentClass ? parentClass : ''}`}
    >
      {/* input */}
      <input
        {...inputProps}
        {...field}
        type={isShowPwd ? 'text' : 'password'}
        className="outline-none flex-1"
      />

      <div
        onClick={() => setIsShowPwd(!isShowPwd)}
        className="p-1 text-primary cursor-pointer"
      >
        {isShowPwd ? <AiFillEyeInvisible /> : <AiFillEye />}
      </div>

      {/* alert error */}
      {isShowSpanError && meta.error && meta.touched && (
        <span className="absolute top-full mt-1 pl-1 inset-x-0 text-14 italic text-red-600">
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default memo(CustomInputPassword);
