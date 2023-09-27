export enum OrderStatusEnum {
  NEW = 'new',
  PROCESSING = 'processing',
  COMPLETED = 'completed'
}

export interface UpdateOrderInterface {
  id: number;
  uniqueId: string;
  name: string;
  email: string;
  msg: string;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatusEnum;
}

export type UpdateOrderType = Pick<UpdateOrderInterface, 'name' | 'email' | 'msg' | 'status'>;

export interface AddNewCakeInterface {
  id: number;
  img?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddNewCakeType = Pick<AddNewCakeInterface, 'name'>;

export interface UpdateCakeInterface {
  id: number;
  img?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateCakeType = Pick<UpdateCakeInterface, 'name'>;

export interface AddNewFillingInterface {
  id: number;
  img?: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddNewFillingType = Pick<AddNewFillingInterface, 'name' | 'description'>;

export interface UpdateFillingInterface {
  id: number;
  img?: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateFillingType = Pick<UpdateFillingInterface, 'name' | 'description'>;

export interface PaginatedResponse<T> {
  count: number;
  data: T[];
}
