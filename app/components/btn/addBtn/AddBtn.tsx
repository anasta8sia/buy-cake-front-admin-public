import { FC } from 'react';
import styles from './addBtn.module.scss';
import { AddBtnInterface } from './types';

const AddBtn: FC<AddBtnInterface> = ({ isValid }) => (
  <>
    <div
      className={styles.addBtn_container}>
      <button
        className={styles.addBtn}
        disabled={!isValid}
        type='submit'>
        Добавить</button>
    </div>
  </>

);

export default AddBtn;
