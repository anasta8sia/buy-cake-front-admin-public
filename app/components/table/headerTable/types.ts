import { SortingInterface } from '@/app/interfaces';
export interface HeaderTableInterface {
  columns: string[];
  sorting: SortingInterface;
  sortTable: (newSorting: SortingInterface) => void;
}
