import { DataCakesInterface } from '@/app/cakes/types';
import { DataFillingsInterface } from '@/app/fillings/types';
import { DataOrdersInterface } from '@/app/interfaces';

export interface BodyTableInterface {
  type: string;
  entries: (DataOrdersInterface | DataCakesInterface | DataFillingsInterface)[];
  columns: string[];
  onDelete: (id: number) => void;
  onSetActive?: (entry: any) => void;
}
