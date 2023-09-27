import { DataFillingsInterface } from '@/app/fillings/types';

export interface UpdateFillingInterface {
  activeFilling: DataFillingsInterface | null;
  onUpdate: (id: number, body: FormData) => void;
}
