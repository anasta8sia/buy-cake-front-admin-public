import { DataCakesInterface } from '@/app/cakes/types';

export interface UpdateCakeInterface {
  activeCake: DataCakesInterface | null;
  onUpdate: (id: number, body: FormData) => void;
}
