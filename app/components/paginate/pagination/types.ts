import { DataCakesInterface } from '@/app/cakes/types';
import { DataFillingsInterface } from '@/app/fillings/types';
import { DataOrdersInterface } from '@/app/interfaces';

export interface PaginatorInterface {
  data: (DataOrdersInterface | DataCakesInterface | DataFillingsInterface)[];
  itemsPerPage: number;
  count: number;
  onSetPage: (selectedPage: number) => void;
  forcedPage: number;
}
