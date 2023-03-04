import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { memo, useState, useEffect } from 'react';
import formatPrice from '../utils/formatPrice';

interface Props {
  setRangePrice: React.Dispatch<React.SetStateAction<string>>;
}

const FilterPrice = ({ setRangePrice }: Props) => {
  const [range, setRange] = useState<number[]>([100000, 100000000]);

  const handleChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setRange(value);
    }
  };

  useEffect(() => {
    const handleSetPrice = setTimeout(() => {
      let str = `${range[0]},${range[1]}`;

      setRangePrice(str);
    }, 800);

    return () => clearTimeout(handleSetPrice);
  }, [range, setRangePrice]);

  return (
    <>
      <h3 className="text-18 font-medium uppercase mb-1">Khoảng giá</h3>

      <div className="px-2">
        <Slider
          value={range}
          onChange={handleChange}
          allowCross={false}
          range={true}
          min={100000}
          max={100000000}
          step={100000}
          trackStyle={{
            backgroundColor: '#fa6e4f',
          }}
          railStyle={{
            backgroundColor: 'GrayText',
          }}
        />
      </div>

      <div className="flex items-center justify-center text-14 mt-3">
        <span>
          {formatPrice(range[0])} - {formatPrice(range[1])}
        </span>
      </div>
    </>
  );
};

export default memo(FilterPrice);
