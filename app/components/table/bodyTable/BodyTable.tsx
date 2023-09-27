/* eslint-disable comma-spacing */
import { FC } from 'react';

import styles from './bodyTable.module.scss';

import { getFormattedDataCell } from '@/app/utils';
import EditCake from '../../cakes/editCake';
import EditOrder from '../../orders/editOrder';
import EditFilling from '../../fillings/editFilling';
import { BodyTableInterface } from './types';

const getEditElement = (type: string, entry: any, onDelete: any, onSetActive: any) => {
  switch (type) {
    case 'order':
      return <EditOrder
        order={entry}
        onDelete={onDelete}
        onSetActive={onSetActive} />;

    case 'cake':
      return <EditCake
        cake={entry}
        onDelete={onDelete}
        onSetActive={onSetActive} />;

    case 'filling':
      return <EditFilling
        filling={entry}
        onDelete={onDelete}
        onSetActive={onSetActive} />;

    default:
      throw new Error('Unknown type.');
  }
};

const BodyTable: FC<BodyTableInterface> = ({
  entries, columns, type, onDelete, onSetActive,
}) => (
  <tbody>
    {(entries).map((entry: any) => (
      <tr
        key={entry.id}>
        {columns.map((column) => (
          <td
            className={styles.table_body_cell}
            key={column}>

            {(column === 'update') && getEditElement(type, entry, onDelete, onSetActive)}

            {getFormattedDataCell(column, entry[column])}
          </td>
        ))}
      </tr>

    ))}
  </tbody>
);

export default BodyTable;
