import { FC } from 'react';
import HeaderCell from '../headerCell/HeaderCell';
import { HeaderTableInterface } from './types';

const HeaderTable: FC<HeaderTableInterface> = ({
  columns,
  sorting,
  sortTable,
}) => (
  <thead>
    <tr>
      {columns.map((column) =>
        <HeaderCell
          column={column}
          sorting={sorting}
          key={column}
          sortTable={sortTable}/>,
      )}
    </tr>
  </thead>
);
export default HeaderTable;
