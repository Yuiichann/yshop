import { IUser } from '../../types';
import privateClient from '../clients/private.clients';
import publicClient from '../clients/public.clients';

interface IFormDataCreateOrder {
  address: IUser['address'];
  phone_number: string;
  products: {
    figure_id: string;
    quantity: number;
  }[];
}

interface IFormDataCheckInStock {
  products: IFormDataCreateOrder['products'];
}

const orderEndpoints = {
  create: () => `orders/create`,
  checkInStock: () => 'orders/check-in-stock',
  orders: () => `/orders/of-user`,
};

const orderApi = {
  createOrder: async (formData: IFormDataCreateOrder) => {
    try {
      const response = await privateClient.post(
        orderEndpoints.create(),
        formData
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  checkInStock: async (formData: IFormDataCheckInStock) => {
    try {
      const response = await publicClient.post(
        orderEndpoints.checkInStock(),
        formData
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getOrders: async () => {
    try {
      const response = await privateClient.get(orderEndpoints.orders());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default orderApi;
