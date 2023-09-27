import { SlShareAlt } from 'react-icons/sl';
import { FC } from 'react';
import { ExitBtnPropsInterface } from './type';
import styles from './exitBtn.module.scss';

const ExitBtn: FC<ExitBtnPropsInterface> = ({ logout }) => (
  <SlShareAlt
    onClick={logout}
    className={styles.exitBtn}
    size={25}
    color="#555555"/>
);
export default ExitBtn;
