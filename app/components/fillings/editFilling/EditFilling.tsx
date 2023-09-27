import { FC } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useAppDispatch } from '../../../store/hooks';
import { toggleUpdateActiveComponent } from '../../../store/updateDataSlice';
import styles from './editFilling.module.scss';
import { EditFillingInterface } from './types';

const EditFilling: FC<EditFillingInterface> = ({ filling, onDelete, onSetActive }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.edit_container}>
      <div
        className={styles.edit_up}
        onClick={() => {
          onSetActive(filling);
          dispatch(toggleUpdateActiveComponent(true));
        }}
      >
        <AiOutlineEdit
          size={22}/>
      </div>
      <div
        className={styles.edit_down}
        onClick={() => {
          onDelete(filling.id);
        }}>
        <AiOutlineDelete
          size={22}/>
      </div>

    </div>
  );
};

export default EditFilling;
