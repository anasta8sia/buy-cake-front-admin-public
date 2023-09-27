import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { dataService } from '@/app/services';
import { setUser } from '@/app/store/userSlice';

const WithAuthCheck = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.userReducer);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      dataService.checkUser()
        .then((res) => dispatch(setUser({ email: res.user.email, id: res.user.id })))
        .catch(() => {
          router.push('/signin');
        });
    }
  }, [router, email, dispatch]);

  return (
    <>
      {children}
    </>
  );
};

export default WithAuthCheck;
