import { SubmitHandler, useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { toggleUpdateActiveComponent } from '../../../store/updateDataSlice';
import { VALIDATE_REGEX } from '@/app/constants';
import CloseBtn from '../../btn/closeBtn';
import UpdateBtn from '../../btn/updateBtn';
import DimmedOutsideWrapper from '../../DimmedOutsideWrapper';
import { UpdateOrderType } from '@/app/services';
import { UpdateOrderInterface } from './types';
import { OrderStatusEnum } from '@/app/interfaces';
import OrderDropDownList from '../orderDropDownList';
import styles from './updateOrder.module.scss';
import { getFormattedDateStr } from '@/app/utils';

const UpdateOrder: FC<UpdateOrderInterface> = ({ activeOrder, onUpdate }) => {
  const [orderName, setOrderName] = useState<string | undefined>(activeOrder?.name);
  const [orderEmail, setOrderEmail] = useState<string | undefined>(activeOrder?.email);
  const [orderMsg, setOrderMsg] = useState<string | undefined>(activeOrder?.msg);
  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum | undefined>(activeOrder?.status);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm<UpdateOrderType>();

  const onOrderStatusUpdate = (newOrderStatus: OrderStatusEnum) => {
    setOrderStatus(newOrderStatus);
  };

  const onSubmit: SubmitHandler<UpdateOrderType> = (data) => {
    try {
      if (!activeOrder) {
        return;
      }

      if (!orderStatus) {
        return;
      }

      data.status = orderStatus;

      onUpdate(activeOrder.id, data);
    } catch (e: unknown) {
      console.warn('error', e);
    }
    reset();
    dispatch(toggleUpdateActiveComponent(false));
  };

  return (
    <DimmedOutsideWrapper>
      <OutsideClickHandler onOutsideClick={() => dispatch(toggleUpdateActiveComponent(false))}>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form_update_data}>

          <h1>Редактировать заказ №{activeOrder?.id}</h1>
          <div
            className={styles.form_update_data_info}>
            <span className={styles.form_update_data_heading}>
              Дата создания:
            </span> {activeOrder && getFormattedDateStr(activeOrder.createdAt)}

          </div>
          <div
            className={styles.form_update_data_info}>
            <span className={styles.form_update_data_heading}>
              Уникальный идентификатор:
            </span> {activeOrder?.uniqueId}
          </div>

          <div
            className={styles.select_container}>
            <OrderDropDownList
              activeStatus={activeOrder?.status}
              onOrderStatusUpdate={onOrderStatusUpdate}/>
          </div>

          <CloseBtn />

          <div className={styles.form_update_fields}>
            <input
              {...register('name', {
                required: true,
                pattern: {
                  value: VALIDATE_REGEX.NAME,
                  message: 'Поле заполнено некорректно',
                },
              })}
              onChange={(ev) => setOrderName(ev.target.value)}
              className={styles.inputName}
              autoComplete="off"
              id="name"
              placeholder=" "
              value={orderName}/>

            <label
              className={styles.placeholderName}
              htmlFor="name">
              Имя пользователя
            </label>
            <div
              className={styles.form_error}>
              {errors.name && <p>{errors.name.message?.toString()}</p>}
            </div>

            <input
              {...register('email', {
                required: true,
                pattern: {
                  value: VALIDATE_REGEX.EMAIL,
                  message: 'Поле заполнено некорректно',
                },
              })}
              onChange={(ev) => setOrderName(ev.target.value)}
              className={styles.inputEmail}
              autoComplete="off"
              id="name"
              placeholder=" "
              value={orderEmail}/>

            <label
              className={styles.placeholderEmail}
              htmlFor="email">
              E-mail
            </label>
            <div
              className={styles.form_error}>
              {errors.email && <p>{errors.email.message?.toString()}</p>}
            </div>

            <input
              {...register('msg', {
                required: true,
                pattern: {
                  value: VALIDATE_REGEX.MESSAGE,
                  message: 'Поле заполнено некорректно',
                },
              })}
              onChange={(ev) => setOrderMsg(ev.target.value)}
              className={styles.inputMsg}
              autoComplete="off"
              id="msg"
              placeholder=" "
              value={orderMsg} />

            <label
              className={styles.placeholderMsg}
              htmlFor="msg">
              Комментарий
            </label>
            <div
              className={styles.form_error}>
              {errors.msg && <p>{errors.msg.message?.toString()}</p>}
            </div>

            <div
              className={styles.input_uploaded_container}>
            </div>
          </div>

          <div
            className={styles.update_btn_container}>
            <UpdateBtn
              isValid={isValid}
            />
          </div>

        </form>

      </OutsideClickHandler>
    </DimmedOutsideWrapper>

  );
};

export default UpdateOrder;
