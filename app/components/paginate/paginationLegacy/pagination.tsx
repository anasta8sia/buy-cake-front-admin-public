import { FC, useState } from 'react';

import styles from './pagination.module.scss';

export interface PaginatorInterface {
  activePage?: number;
  limit: number;
  elementsSize: number;
  updateActivePage: (page: number) => void;
}

const Paginations: FC<PaginatorInterface> = ({ limit, elementsSize, updateActivePage, activePage }) => {
  const pageSize = Math.ceil(elementsSize / limit);

  const elements = [];

  for (let i = 1; i < pageSize + 1; i++) {
    const btn = <button
      className={styles.btn_pagination}
      key={`pagination-${i}`}
      type='button'
      onClick={() => updateActivePage(i)}>
      {i}
    </button>;

    elements.push(btn);
  }

  return (
    <>
      <div
        className={styles.btn_pagination_container}>
        <button
          className={styles.btn_back}
          type='button'>Назад</button>
        {elements}
        <button
          className={styles.btn_forth}
          type='button'>Вперед</button>
      </div>
    </>
  );
};

export default Paginations;
