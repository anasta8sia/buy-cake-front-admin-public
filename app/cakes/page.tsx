/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import SearchBar from '../components/searchBar';
import BodyTable from '../components/table/bodyTable';
import HeaderTable from '../components/table/headerTable';
import PaginatedItems from '../components/paginate/pagination';
import AddNewDataBtn from '../components/btn/addNewDataBtn';
import AddNewCake from '../components/cakes/addNewCake';
import UpdateCake from '../components/cakes/updateCake';
import { dataService } from '../services/dataService';
import { COLUMNS_CAKES, COLUMNS_CAKES_ADAPTED, PAGE_SIZE } from '../constants';
import { useHandlerToken } from '../components/useHandlerToken/useHandlerToken';
import { SortingInterface } from '../interfaces/interfaces';
import { DataCakesInterface } from './types';

const CakesTable = () => {
  const [cakes, setCakes] = useState<DataCakesInterface[]>([]);
  const [count, setCount] = useState<number>(0);
  const [sorting, setSorting] = useState<SortingInterface>({ column: 'id', order: 'asc' });
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState<number>(1);
  const [activeCake, setActiveCake] = useState<DataCakesInterface | null>(null);
  const [error, setError] = useState<any>(null);

  const { isActiveAddComponent } = useAppSelector(state => state.addNewDataReducer);
  const { isActiveUpdateComponent } = useAppSelector(state => state.updateDataReducer);

  const [handlerToken] = useHandlerToken();

  const searchTable = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
  };

  const sortTable = (newSorting: SortingInterface) => {
    setSorting(newSorting);
  };

  const updateData = async () => {
    handlerToken();
    const data = await dataService.getCakes(page, sorting, searchValue);

    setCount(data.count);
    setCakes(data.data);

    setError(error);
  };

  const onAddCake = (body: FormData) => {
    dataService.addNewCake(body)
      .then(() => updateData()).catch((e) => setError(e));
  };

  const onDeleteCake = (id: number) => {
    const conf = confirm('Вы уверены, что хотите удалить данную запись?');

    if (!conf) {
      return;
    }

    dataService.deleteCake(id)
      .then(() => updateData()).catch((e) => setError(e));
  };

  const onUpdateCake = (id: number, body: FormData) => {
    dataService.updateCake(id, body)
      .then(() => updateData()).catch((e) => setError(e));
  };

  const onSetActiveCake = (cake: DataCakesInterface) => {
    setActiveCake(cake);
  };

  const onSetPage = (selectedPage: number) => {
    setPage(selectedPage);
  };

  useEffect(() => {
    updateData().catch((e) => setError(e));
  }, [sorting, searchValue, page]);

  return (
    <>
      <div
        className="table_contanier">
        <div className="header_contanier">
          <h1 className="heading">
            Торты
          </h1>
        </div>

        <div
          className="search_btn_cake_container">
          <SearchBar searchTable={searchTable}/>
          <AddNewDataBtn/>
        </div>

        <div>
          {(isActiveAddComponent === true) ? <AddNewCake onAddCake={onAddCake}/> : null}
        </div>

        <div>
          {(isActiveUpdateComponent === true)
            ? <UpdateCake activeCake={activeCake} onUpdate={onUpdateCake}/>
            : null}
        </div>

        <PaginatedItems
          itemsPerPage={PAGE_SIZE}
          data={cakes}
          count={count}
          onSetPage={onSetPage}
          forcedPage={page}/>

        <div className='cake_table_container'>
          <table
            id="table"
            className="cake_table">
            <HeaderTable
              columns={COLUMNS_CAKES_ADAPTED}
              sorting={sorting}
              sortTable={sortTable}/>
            <BodyTable
              type="cake"
              entries={cakes}
              columns={COLUMNS_CAKES}
              onDelete={onDeleteCake}
              onSetActive={onSetActiveCake}/>
          </table>
        </div>

        <PaginatedItems
          itemsPerPage={PAGE_SIZE}
          data={cakes}
          count={count}
          onSetPage={onSetPage}
          forcedPage={page}/>
        {error && <h2 className='error'> Internal server Error </h2>}
      </div>

    </>
  );
};

export default CakesTable;
