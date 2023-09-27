import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { FC } from 'react';
import { SORT_FIELDS } from '@/app/constants';

import styles from './headerCell.module.scss';
import { HeaderCellInterface } from './types';

const HeaderCell: FC<HeaderCellInterface> = ({
  column,
  sorting,
  sortTable,
}) => {
  const isAscSorting = sorting.column === column && sorting.order === 'asc';
  const isDescSorting = sorting.column === column && sorting.order === 'desc';

  const futureSortingOrder = isDescSorting ? 'asc' : 'desc';

  const sortAvailable = SORT_FIELDS.includes(column);

  return (
    <th
      className={styles.table_header_cell}
      onClick={
        () => sortAvailable && sortTable({ column, order: futureSortingOrder })}
      key={column}>
      {column}

      {sortAvailable && isAscSorting &&
      <span
        className={styles.sort}><FaSortUp style={{ verticalAlign: 'bottom' }}/>
      </span>}
      {sortAvailable && isDescSorting &&
      <span
        className={styles.sort}><FaSortDown/>
      </span>}
    </th>
  );
};

export default HeaderCell;
