import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AddNewDataSliceInterface {
  isActiveAddComponent: boolean;
}

const initialState: AddNewDataSliceInterface = {
  isActiveAddComponent: false,
};

const addNewDataSlice = createSlice({
  name: 'addNewData',
  initialState,
  reducers: {
    toggleAddActiveComponent (state, action: PayloadAction<boolean>) {
      state.isActiveAddComponent = action.payload;
    },
  },
},
);

export const { toggleAddActiveComponent } = addNewDataSlice.actions;
export default addNewDataSlice.reducer;
