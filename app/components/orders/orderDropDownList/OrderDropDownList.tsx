import { FC, useState } from 'react';
import Select, { StylesConfig } from 'react-select';

import styles from './orderDropDownList.module.scss';
import { OrderStatusEnum } from '@/app/interfaces';

interface OrderDropDownListInterface {
  onOrderStatusUpdate: (newOrderStatus: OrderStatusEnum) => void;
  activeStatus?: string;
}

const options = [
  { value: 'new', label: 'New', color: '#555555' },
  { value: 'processing', label: 'Processing', color: '#555555' },
  { value: 'completed', label: 'Completed', color: '#555555' },
];

const OPTION: Record<string, any> = {
  NEW: { value: 'new', label: 'New', color: '#555555' },
  PROCESSING: { value: 'processing', label: 'Processing', color: '#555555' },
  COMPLETED: { value: 'completed', label: 'Completed', color: '#555555' },
} as const;

const OrderDropDownList: FC<OrderDropDownListInterface> = ({ onOrderStatusUpdate, activeStatus }) => {
  const [selectedOption, setSelectedOption] = useState((activeStatus && OPTION[activeStatus.toUpperCase()]) || null);

  const handleChange = (option: any) => {
    setSelectedOption(option);
    onOrderStatusUpdate(option.value);
  };

  const colorStyles: StylesConfig = {
    control: (style) => ({
      ...style,
      backgroundColor: 'white',
      width: '225px',
      boxShadow: 'none',
      border: '1px solid #999999',
      marginTop: '10px',
      marginBottom: '10px',

      ':focus-within': {
        border: '1px solid #333333',
      },
    }),
    option: (style, { isFocused, isSelected }) => ({
      ...style,
      backgroundColor: isSelected
        ? '#999999'
        : isFocused
          ? '#dcdcdc'
          : 'white',
      ':active': {
        backgroundColor: 'white',
      },
    }),
  };

  return (
    <div className={styles.dropdown}>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
        styles={colorStyles}
      />
    </div>

  );
};

export default OrderDropDownList;
