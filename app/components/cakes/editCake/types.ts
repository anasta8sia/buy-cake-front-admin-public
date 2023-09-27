import { DataCakesInterface } from '@/app/cakes/types';

export interface EditCakeInterface {
  cake: DataCakesInterface;
  onDelete: (id: number) => void;
  onSetActive: (cake: DataCakesInterface) => void;
}
