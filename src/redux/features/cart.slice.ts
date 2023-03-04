import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ICart, IShoppingCart } from '../../types';

const rawDataLocal = localStorage.getItem('shopping_cart_yshop');

const saveDataToLocal = (data: IShoppingCart) => {
  localStorage.setItem('shopping_cart_yshop', JSON.stringify(data));
};

let initialState: IShoppingCart;

if (rawDataLocal) {
  initialState = JSON.parse(rawDataLocal);
} else {
  initialState = {
    total: 0,
    items: [],
  };
}

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ICart>) => {
      const checkCartIndex = state.items.findIndex(
        (item) => item.figure.id === action.payload.figure.id
      );

      if (checkCartIndex === -1) {
        if (state.items.length >= 10) {
          toast.info('Giỏ hàng chỉ được tối đa 10 sản phẩm!');
          return;
        }

        const figurePrice =
          action.payload.quantity * action.payload.figure.price;

        state.total += figurePrice;
        state.items = [...state.items, action.payload];
      } else {
        const newArr = [...state.items];

        newArr[checkCartIndex].quantity += action.payload.quantity;

        const figurePrice =
          action.payload.quantity * action.payload.figure.price;

        state.total += figurePrice;
      }
      toast.success('Đã thêm sản phẩm vào giỏ hàng!');
      saveDataToLocal(state);
    },

    removeCart: (state, action: PayloadAction<string>) => {
      const checkCartIndex = state.items.findIndex(
        (item) => item.figure.id === action.payload
      );

      const priceOfCart =
        state.items[checkCartIndex].quantity *
        state.items[checkCartIndex].figure.price;

      state.total -= priceOfCart;
      state.items.splice(checkCartIndex, 1);
      saveDataToLocal(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const checkCartIndex = state.items.findIndex(
        (item) => item.figure.id === action.payload.id
      );

      const priceOfCart =
        action.payload.quantity * state.items[checkCartIndex].figure.price;

      const oldPrice =
        state.items[checkCartIndex].figure.price *
        state.items[checkCartIndex].quantity;

      const newPrice = state.total - oldPrice + priceOfCart;

      state.total = newPrice;
      state.items[checkCartIndex].quantity = action.payload.quantity;
      saveDataToLocal(state);
    },
  },
});

export const { addCart, removeCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
