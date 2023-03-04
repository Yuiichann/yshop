import { memo, useState, useEffect } from 'react';
import FigureScales from '../constants/FigureScales.constants';
import { HiCheck } from 'react-icons/hi';

interface Props {
  setScaleQuery: React.Dispatch<React.SetStateAction<string>>;
}

const FilterScale = ({ setScaleQuery }: Props) => {
  const [checked, setChecked] = useState<string[]>([]);
  const handleChecked = (value: string) => {
    const checkIndex = checked.findIndex((item) => item === value);

    if (checkIndex !== -1) {
      const newArr = [...checked];
      newArr.splice(checkIndex, 1);
      setChecked(newArr);
    } else {
      setChecked((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    const handleScaleQuery = setTimeout(() => {
      const query = checked.reduce((string, curr, index) => {
        return index !== 0 ? `${string},${curr}` : curr;
      }, '');

      setScaleQuery(query);
    }, 500);

    return () => clearTimeout(handleScaleQuery);
  }, [checked, setScaleQuery]);

  return (
    <>
      <h3 className="text-18 font-medium uppercase mb-1">Tỉ lệ</h3>
      <ul className="w-full ml-3 select-none">
        {FigureScales.map((scale) => (
          <li key={scale.value} className="">
            <input
              type="checkbox"
              value={scale.value}
              id={scale.value}
              onChange={() => handleChecked(scale.value)}
              hidden={true}
            />

            <label
              htmlFor={scale.value}
              className="flex items-center gap-1 mb-1 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-sm border border-primary flex items-center justify-center effect ${
                  checked.includes(scale.value) ? 'bg-primary' : ''
                }`}
              >
                {checked.includes(scale.value) && (
                  <HiCheck className="font-bold text-white" />
                )}
              </div>

              <span>{scale.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default memo(FilterScale);
