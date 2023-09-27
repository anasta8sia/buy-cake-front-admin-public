import { SubmitHandler, useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { toggleUpdateActiveComponent } from '../../../store/updateDataSlice';
import { VALIDATE_REGEX } from '@/app/constants';
import CloseBtn from '../../btn/closeBtn';
import UpdateBtn from '../../btn/updateBtn';
import DimmedOutsideWrapper from '../../DimmedOutsideWrapper';
import InputUploadedImg from '../../btn/btnUploadedImg';
import { UpdateFillingType } from '@/app/services';
import { UpdateFillingInterface } from './types';
import styles from './updateFilling.module.scss';

const UpdateFilling: FC<UpdateFillingInterface> = ({ activeFilling, onUpdate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fillingName, setFillingName] = useState<string | undefined>(activeFilling?.name);
  const [fillingDescription, setfillingDescription] = useState<string | undefined>(activeFilling?.description);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm<UpdateFillingType>();

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<UpdateFillingType> = (data) => {
    try {
      if (!activeFilling) {
        return;
      }

      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      if (selectedFile !== null) {
        formData.append('file', selectedFile);
      }

      onUpdate(activeFilling.id, formData);
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
              onChange={(ev) => setFillingName(ev.target.value)}
              className={styles.inputName}
              autoComplete="off"
              id="name"
              placeholder=" "
              value={fillingName}/>

            <label
              className={styles.placeholderName}
              htmlFor="name">
              Название
            </label>
            <div
              className={styles.form_error}>
              {errors.name && <p>{errors.name.message?.toString()}</p>}
            </div>

            <input
              {...register('description', {
                required: true,
                pattern: {
                  value: VALIDATE_REGEX.MESSAGE,
                  message: 'Поле заполнено некорректно',
                },
              })}
              onChange={(ev) => setfillingDescription(ev.target.value)}
              className={styles.inputDescription}
              autoComplete="off"
              id="description"
              placeholder=" "
              value={fillingDescription}/>

            <label
              className={styles.placeholderDescription}
              htmlFor="description">
              Описание
            </label>
            <div
              className={styles.form_error}>
              {errors.description && <p>{errors.description.message?.toString()}</p>}
            </div>

            <div
              className={styles.input_uploaded_container}>
              <InputUploadedImg
                selectedFile={selectedFile}
                handelChange={handelChange}/>
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

export default UpdateFilling;
