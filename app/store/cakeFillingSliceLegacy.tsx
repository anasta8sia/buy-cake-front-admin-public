import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddNewFillingType, dataService } from '../services';
import { SortingInterface } from '../interfaces';
import { DataFillingsInterface } from '../fillings/types';

export interface FillingsInterface {
  data: DataFillingsInterface[];
  count: number;
}
export interface CakeFillingSliceInterface {
  dataFillings: DataFillingsInterface[];
  countFillings: number;
}

export interface ParamsInterface {
  sorting: SortingInterface;
  searchValue: string;
  page: number;
}

export const fetchFillings = createAsyncThunk<FillingsInterface, ParamsInterface, { rejectValue: string }>(
  'filling/fetchFillings',
  async function (params, { rejectWithValue }) {
    try {
      const data = await dataService.getFillings(params.page, params.sorting, params.searchValue);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addFillings = createAsyncThunk<AddNewFillingType, FormData, { rejectValue: string }>(
  'filling/addFillings',
  async function (body, { rejectWithValue }) {
    try {
      const data = await dataService.addNewFilling(body);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState: CakeFillingSliceInterface = {
  dataFillings: [],
  countFillings: 0,
};

const FillingSlice = createSlice({
  name: 'filling',
  initialState: {
    initialState,
    loading: false,
    error: '',
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFillings.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchFillings.fulfilled, (state, action) => {
        state.loading = false;
        state.initialState.dataFillings = action.payload.data;
        state.initialState.countFillings = action.payload.count;
      })
      .addCase(fetchFillings.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
          state.loading = false;
        }
      })

      .addCase(addFillings.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
          state.loading = false;
        }
      });
  },
});

export default FillingSlice.reducer;
