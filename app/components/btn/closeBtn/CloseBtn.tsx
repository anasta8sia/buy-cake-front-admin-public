import { FC } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { toggleAddActiveComponent } from '../../../store/addNewDataSlice';
import { toggleUpdateActiveComponent } from '../../../store/updateDataSlice';
import styles from './closeBtn.module.scss';

const CloseBtn: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.closeBtn}>
      <svg
        onClick={() => {
          dispatch(toggleAddActiveComponent(false));
          dispatch(toggleUpdateActiveComponent(false));
        }}
        xmlns="http://www.w3.org/2000/svg"
        height="25"
        viewBox="0 96 960 960"
        width="25">
        <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
      </svg>
    </div>
  );
};
export default CloseBtn;
