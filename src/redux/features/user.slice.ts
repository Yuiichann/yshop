import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types';

interface IUserSlice {
  user: IUser | null;
}

const initialState: IUserSlice = {
  user: null,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
