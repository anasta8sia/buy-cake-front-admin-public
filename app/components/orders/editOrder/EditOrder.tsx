import { FC } from 'react';

import { AiOutlineDelete, AiOutlineFileDone } from 'react-icons/ai';
import { useAppDispatch } from '@/app/store/hooks';
import { toggleUpdateActiveComponent } from '@/app/store/updateDataSlice';
import { EditOrderInterface } from './types';
import styles from './editOrder.module.scss';

const EditOrder: FC<EditOrderInterface> = ({ order, onDelete, onSetActive }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.edit_container}>
      <div
        className={styles.edit}
        onClick={() => {
          onSetActive(order);
          dispatch(toggleUpdateActiveComponent(true));
        }}>
        <AiOutlineFileDone
          size={22}/>
      </div>
      <div
        className={styles.edit}
        onClick={() => {
          onDelete(order.id);
        }}>
        <AiOutlineDelete
          size={22}/>
      </div>

    </div>

  );
};

export default EditOrder;
