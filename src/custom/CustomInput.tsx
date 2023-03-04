import { useField } from 'formik';
import { memo } from 'react';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  inputClassname?: string;

  parentClass?: string;
  isShowSpanError?: boolean;
}

const CustomInput = (props: Props) => {
  const { parentClass, inputClassname, isShowSpanError, ...inputProps } = props;
  const [field, meta] = useField(inputProps);

  return (
    <div className={`relative mb-4 ${parentClass ? parentClass : ''}`}>
      {/* input */}
      <input
        {...inputProps}
        {...field}
        className={`p-2 border outline-none w-full rounded-sm shadow-sm focus:border-primary effect ${
          inputClassname ? inputClassname : ''
        } ${meta.error && meta.touched && 'border-red-600'}`}
      />

      {/* alert error */}
      {isShowSpanError && meta.error && meta.touched && (
        <span className="absolute top-full mt-1 pl-1 inset-x-0 text-14 italic text-red-600">
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default memo(CustomInput);
