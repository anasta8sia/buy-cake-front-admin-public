import { DataFillingsInterface } from '@/app/fillings/types';

export interface EditFillingInterface {
  filling: DataFillingsInterface;
  onDelete: (id: number) => void;
  onSetActive: (filling: DataFillingsInterface) => void;
}
