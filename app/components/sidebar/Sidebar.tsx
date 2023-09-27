'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import ExitBtn from '../btn/exitBtn';

import styles from './sidebar.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeUser } from '../../store/userSlice';

const SideBar: FC = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.userReducer);
  const router = useRouter();
  const logout = () => {
    dispatch(removeUser());
    router.push('/signin');
  };

  if (!email) {
    return null;
  }

  return (
    <>
      <div className={styles.sidebar}>

        <div className={styles.admin_info_contanier}>
          <div className={styles.admin_avatar_contanier}>
            <Image
              className={styles.admin_avatar}
              src='/admin_base.png'
              alt='admin'
              width={45}
              height={45}
              priority={true}>
            </Image>
          </div>
          <div className={styles.admin_info}>Ника Гришина</div>
        </div>

        <div
          className={styles.navigate}>
          <Link href='/'>Заказы</Link>
          <Link href='/cakes'>Торты</Link>
          <Link href='/fillings'>Начинки</Link>
        </div>

        <div className={styles.exit_btn_container}>
          <ExitBtn logout={logout} />
        </div>

      </div>
    </>
  );
};

export default SideBar;
