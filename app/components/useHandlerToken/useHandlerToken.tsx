import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/store/hooks';
import { removeUser } from '@/app/store/userSlice';
import { authSession } from '../../services/authSession';

export const useHandlerToken = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlerToken = () => {
    const token = authSession.getAccessToken();

    if (!token) {
      dispatch(removeUser());
      router.push('/signin');
    }
  };

  return [handlerToken];
};
