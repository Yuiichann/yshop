import React, { memo } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
  return (
    <div className="w-full h-96  flex items-center justify-center">
      <div className="text-5xl font-bold text-primary animate-spin">
        <AiOutlineLoading3Quarters />
      </div>
    </div>
  );
};

export default memo(Loading);
