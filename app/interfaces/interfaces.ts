export enum OrderStatusEnum {
  NEW = 'new',
  PROCESSING ='processing',
  COMPLETED = 'completed'
}
export interface DataOrdersInterface {
  id: number;
  uniqueId: string;
  name: string;
  email: string;
  msg: string;
  createdAt: string;
  status: OrderStatusEnum;
}

export interface SortingInterface {
  column: string;
  order: string;
}
