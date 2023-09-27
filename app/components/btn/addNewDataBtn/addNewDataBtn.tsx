import { FC } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { toggleAddActiveComponent } from '../../../store/addNewDataSlice';

import styles from './addNewDataBtn.module.scss';

const AddNewDataBtn: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.add_new_data_btn_container}>
      <button
        className={styles.add_new_data_btn}
        onClick={() => {
          dispatch(toggleAddActiveComponent(true));
        }}>
        Добавить
      </button>
    </div>
  );
};

export default AddNewDataBtn;
