import { FC } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useAppDispatch } from '../../../store/hooks';
import { toggleUpdateActiveComponent } from '../../../store/updateDataSlice';
import styles from './editCake.module.scss';
import { EditCakeInterface } from './types';

const EditCake: FC<EditCakeInterface> = ({ cake, onDelete, onSetActive }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.edit_container}>
      <div
        className={styles.edit_up}
        onClick={() => {
          onSetActive(cake);
          dispatch(toggleUpdateActiveComponent(true));
        }}
      >
        <AiOutlineEdit
          size={22}/>
      </div>
      <div
        className={styles.edit_down}
        onClick={() => {
          onDelete(cake.id);
        }}>
        <AiOutlineDelete
          size={22}/>
      </div>

    </div>
  );
};

export default EditCake;
