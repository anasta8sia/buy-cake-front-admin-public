import { SubmitHandler, useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { toggleUpdateActiveComponent } from '../../../store/updateDataSlice';
import { VALIDATE_REGEX } from '@/app/constants';
import CloseBtn from '../../btn/closeBtn';
import DimmedOutsideWrapper from '../../DimmedOutsideWrapper';
import UpdateBtn from '../../btn/updateBtn';
import InputUploadedImg from '../../btn/btnUploadedImg';
import { UpdateCakeInterface } from './types';
import { UpdateCakeType } from '@/app/services';
import styles from './updateCake.module.scss';

const UpdateCake: FC<UpdateCakeInterface> = ({ activeCake, onUpdate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cakeName, setCakeName] = useState<string | undefined>(activeCake?.name);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm<UpdateCakeType>();

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<UpdateCakeType> = (data) => {
    try {
      if (!activeCake) {
        return;
      }

      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      if (selectedFile !== null) {
        formData.append('file', selectedFile, 'sd');
      }

      onUpdate(activeCake.id, formData);
    } catch (e: unknown) {
      console.warn('error', e);
    }
    reset();
    dispatch(toggleUpdateActiveComponent(false));
  };

  const onInvalidFormSubmit = (data: any) => {
    console.warn('Form is invalid!');
  };

  return (
    <DimmedOutsideWrapper>
      <OutsideClickHandler onOutsideClick={() => dispatch(toggleUpdateActiveComponent(false))}>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalidFormSubmit)}
          className={styles.form_update_data}>

          <h1>Изменить:</h1>

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
              onChange={(ev) => setCakeName(ev.target.value)}
              className={styles.inputName}
              autoComplete="off"
              id="name"
              placeholder=" "
              value={cakeName}/>
            <label
              className={styles.placeholderName}
              htmlFor="name">
              Название
            </label>

            <div
              className={styles.form_error}>
              {errors.name && <p>{errors.name.message?.toString()}</p>}
            </div>

            <div
              className={styles.input_uploaded_container}>
              <InputUploadedImg
                selectedFile={selectedFile}
                handelChange={handelChange}
              />
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

export default UpdateCake;
