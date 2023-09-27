import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UpdateDataSliceInterface {
  isActiveUpdateComponent: boolean;
}

const initialState: UpdateDataSliceInterface = {
  isActiveUpdateComponent: false,
};

const updateDataSlice = createSlice({
  name: 'updateData',
  initialState,
  reducers: {
    toggleUpdateActiveComponent (state, action: PayloadAction<boolean>) {
      state.isActiveUpdateComponent = action.payload;
    },
  },
},

);

export const { toggleUpdateActiveComponent } = updateDataSlice.actions;
export default updateDataSlice.reducer;
