import { combineReducers, configureStore } from '@reduxjs/toolkit';
import addNewDataReducer from './addNewDataSlice';
import updateDataReducer from './updateDataSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  addNewDataReducer,
  updateDataReducer,
  userReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
