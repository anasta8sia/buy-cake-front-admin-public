import { DataOrdersInterface } from '@/app/interfaces';

export interface EditOrderInterface {
  order: DataOrdersInterface ;
  onDelete: (id: number) => void;
  onSetActive: (cake: DataOrdersInterface) => void;
}
