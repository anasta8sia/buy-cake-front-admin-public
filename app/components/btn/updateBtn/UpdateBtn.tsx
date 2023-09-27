import { FC } from 'react';
import styles from './updateBtn.module.scss';
import { UpdateBtnInterface } from './types';

const UpdateBtn: FC<UpdateBtnInterface> = ({ isValid }) => (
  <>
    <div
      className={styles.updateBtn_container}>
      <button
        className={styles.updateBtn}
        disabled={!isValid}
        type="submit"
      >
        Сохранить
      </button>
    </div>
  </>
);

export default UpdateBtn;
