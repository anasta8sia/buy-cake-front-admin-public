/* eslint-disable max-len */
export const SORT_FIELDS = ['id', 'createdAt'];

export const PAGE_SIZE = 10;

export const BTN_SIZE = 3;

export const DOTS = '...';

export const COLUMNS_FILLINGS = ['id', 'createdAt', 'name', 'description', 'update'];
export const COLUMNS_FILLINGS_ADAPTED = ['id', 'Дата', 'Название', 'Описание', ''];

export const COLUMNS_CAKES = ['id', 'createdAt', 'name', 'update'];
export const COLUMNS_CAKES_ADAPTED = ['id', 'Дата', 'Название', ''];

export const COLUMNS_ORDERS = ['id', 'createdAt', 'name', 'email', 'msg', 'uniqueId', 'update'];
export const COLUMNS_ORDERS_ADAPTED = ['id', 'Дата', 'Имя', 'E-mail', 'Комментарий', 'Номер заказа', ''];

export const VALIDATE_REGEX = {
  NAME: /^([A-Za-z\-']{2,255})|([А-Яа-я\-']{2,255})$/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  MESSAGE: /^[a-zA-Z0-9 !?:;,.()@$%\-+=*'"а-яА-Я\n]{4,255}$/,
};
