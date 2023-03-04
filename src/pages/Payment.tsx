import React from 'react';
import { useLocation } from 'react-router-dom';
import { ICart } from '../types';

const Payment = () => {
  const { state }: { state: ICart } = useLocation();

  console.log(state);
  return <div>Payment</div>;
};

export default Payment;
