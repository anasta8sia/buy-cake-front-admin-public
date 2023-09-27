import { DataOrdersInterface } from '@/app/interfaces';
import { UpdateOrderType } from '@/app/services/types';

export interface UpdateOrderInterface {
  activeOrder: DataOrdersInterface | null;
  onUpdate: (id: number, body: UpdateOrderType) => void;
}
