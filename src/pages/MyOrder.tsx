import React, { useEffect } from 'react';
import orderApi from '../api/modules/order.api';

const MyOrder = () => {
  useEffect(() => {
    const getData = async () => {
      const { response, error } = await orderApi.getOrders();

      console.log(response, error);
    };

    getData();
  }, []);

  return <div>MyOrder</div>;
};

export default MyOrder;
