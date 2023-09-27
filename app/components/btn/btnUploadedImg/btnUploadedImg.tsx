import React, { FC } from 'react';
import styles from './btnUploadedImg.module.scss';

export interface InputUploadedImgPropsInterface {
  selectedFile: {
    name: string;
  } | null;
  handelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputUploadedImg: FC<InputUploadedImgPropsInterface> = ({ selectedFile, handelChange }) => (
  <>
    <div className={styles.container_btn_uploaded}>
      <label className={styles.input_file}>
        <input
          onChange={handelChange}
          type="file"
          accept='image/*'
          name="file">
        </input>
        <div>
            Выберите файл
        </div>
      </label>

      {selectedFile && (
        <div className={styles.info_uploaded}>
          {selectedFile.name}
        </div>
      )}
    </div>
  </>
);

export default InputUploadedImg;
