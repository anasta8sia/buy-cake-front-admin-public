import { SortingInterface } from '@/app/interfaces';

export interface HeaderCellInterface {
  column: string;
  sorting: SortingInterface;
  sortTable: (newSorting: SortingInterface) => void;
}
