import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserSliceInteface {
  email: null | string;
  id: null | number;
}

const initialState: UserSliceInteface = {
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action: PayloadAction<UserSliceInteface>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser (state) {
      state.email = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
