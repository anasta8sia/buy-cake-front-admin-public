import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '.';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuth () {
  const { email, id } = useAppSelector(state => state.userReducer);

  return {
    isAuth: !!email,
    email,
    id,
  };
}
