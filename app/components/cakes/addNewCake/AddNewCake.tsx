import { SubmitHandler, useForm } from 'react-hook-form';

import OutsideClickHandler from 'react-outside-click-handler';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { toggleAddActiveComponent } from '@/app/store/addNewDataSlice';
import { VALIDATE_REGEX } from '@/app/constants';
import CloseBtn from '../../btn/closeBtn';
import DimmedOutsideWrapper from '../../DimmedOutsideWrapper';
import AddBtn from '../../btn/addBtn';
import InputUploadedImg from '../../btn/btnUploadedImg';
import { AddNewCakeDataInterface } from './types';
import { AddNewCakeType } from '@/app/services';
import styles from './addNewCake.module.scss';

const AddNewCake: FC<AddNewCakeDataInterface> = ({ onAddCake }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm<AddNewCakeType>();

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<AddNewCakeType> = (data) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      if (selectedFile !== null) {
        formData.append('file', selectedFile);
      }

      onAddCake(formData);
    } catch (e: unknown) {
      console.warn('error', e);
    }
    reset();
    dispatch(toggleAddActiveComponent(false));
  };

  return (
    <DimmedOutsideWrapper>
      <OutsideClickHandler onOutsideClick={() => dispatch(toggleAddActiveComponent(false)) }>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form_add_data}>

          <h1>Введите название продукта и загрузите изображение</h1>
          <CloseBtn />

          <div className={styles.form_add_fields}>
            <input
              {...register('name', {
                required: true,
                pattern: {
                  value: VALIDATE_REGEX.NAME,
                  message: 'Поле заполнено некорректно',
                },
              },
              )}
              className={styles.inputName}
              autoComplete="off"
              id="name"
              placeholder=" " />
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
                handelChange={handelChange} />
            </div>
          </div>

          <div
            className={styles.add_btn_container}>
            <AddBtn
              isValid={isValid}
            />
          </div>
        </form>

      </OutsideClickHandler>
    </DimmedOutsideWrapper>

  );
};

export default AddNewCake;
