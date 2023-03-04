import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart.slice';
import userSlice from './features/user.slice';

const store = configureStore({
  reducer: { user: userSlice, cart: cartSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
