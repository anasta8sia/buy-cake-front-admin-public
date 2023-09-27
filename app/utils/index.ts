export const RU_DATE = new Intl.DateTimeFormat('ru');

export const getFormattedDate = (date: Date) => RU_DATE.format(date);

export const getFormattedDateStr = (date: string) => RU_DATE.format(new Date(date));

export const getFormattedDataCell = (columnName: string, value: string | number) => {
  switch (columnName) {
    case 'createdAt':
      return getFormattedDate(new Date(value));

    default:
      return value;
  }
};
