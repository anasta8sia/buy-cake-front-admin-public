'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dataService } from '../../services';
import { authSession } from '../../services/authSession';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUser } from '../../store/userSlice';

import styles from './form.module.scss';

export interface FormInterface {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<any>(null);

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm<FormInterface>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInterface> = async (data) => {
    try {
      const res = await dataService.auth(data.email, data.password);
      authSession.setAccessToken(res.accessToken);
      dispatch(setUser({ email: res.user.email, id: res.user.id }));
      router.push('/');
    } catch (e: unknown) {
      setError((e as Error).message);
    }

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}>

      <div className={styles.fields}>

        <input
          {...register('email', {
            required: 'Введите e-mail',
          })}
          className={styles.inputLogin}
          autoComplete="off"
          id="login"
          placeholder=" "/>

        <label
          className={styles.placeholderLogin}
          htmlFor="login">
          Логин
        </label>
        <div
          className={styles.form_error}>
          {errors.email && <p>{errors.email.message?.toString()}</p>}
        </div>
        <div
          className={styles.form_error}>
          {error && <p>{error}</p>}
        </div>

        <input
          {...register('password', {
            required: 'Введите пароль',
          })}
          className={styles.inputPassword}
          type="password"
          autoComplete="off"
          id="password"
          placeholder=" "/>

        <label
          className={styles.placeholderPassword}
          htmlFor="password">
          Пароль
        </label>
        <div
          className={styles.form_error}>
          {errors.password && <p>{errors.password.message?.toString()}</p>}
        </div>
        <div
          className={styles.form_error}>
          {error && <p>{error}</p>}
        </div>

        <button
          type='submit'
          disabled={!isValid}>
          Войти
        </button>

      </div>
    </form>

  );
};

export default Login;
