/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import SearchBar from '../components/searchBar';
import BodyTable from '../components/table/bodyTable';
import HeaderTable from '../components/table/headerTable';
import PaginatedItems from '../components/paginate/pagination';
import AddNewDataBtn from '../components/btn/addNewDataBtn';
import AddNewFilling from '../components/fillings/addNewFilling';
import UpdateFilling from '../components/fillings/updateFilling';
import { dataService } from '../services/dataService';
import { COLUMNS_FILLINGS, COLUMNS_FILLINGS_ADAPTED, PAGE_SIZE } from '../constants';
import { useHandlerToken } from '../components/useHandlerToken/useHandlerToken';
import { SortingInterface } from '../interfaces';
import { fetchFillings } from '../store/cakeFillingSliceLegacy';
import { DataFillingsInterface } from './types';

const FillingsTable = () => {
  const [fillings, setFilling] = useState<DataFillingsInterface[]>([]);
  const [count, setCount] = useState<number>(0);
  const [sorting, setSorting] = useState<SortingInterface>({ column: 'id', order: 'asc' });
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState<number>(1);
  const [activeFilling, setActiveFilling] = useState<DataFillingsInterface | null>(null);
  const [error, setError] = useState<any>(null);

  const dispatch = useAppDispatch();

  const { isActiveAddComponent } = useAppSelector((state) => state.addNewDataReducer);
  const { isActiveUpdateComponent } = useAppSelector((state) => state.updateDataReducer);

  const [handlerToken] = useHandlerToken();

  const searchTable = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
  };

  const sortTable = (newSorting: SortingInterface) => {
    setSorting(newSorting);
  };

  const updateData = async () => {
    handlerToken();
    const data = await dataService.getFillings(page, sorting, searchValue);
    setCount(data.count);
    setFilling(data.data);

    dispatch(fetchFillings({ page, sorting, searchValue }));
  };

  const onAddFilling = (body: FormData) => {
    dataService.addNewFilling(body)
      .then(() => updateData()).catch((e) => setError(e));
  };

  const onDeleteFilling = (id: number) => {
    const conf = confirm('Вы уверены, что хотите удалить данную запись?');

    if (!conf) {
      return;
    }

    dataService.deleteFilling(id)
      .then(() => updateData()).catch((e) => setError(e));
  };

  const onUpdateFilling = (id: number, body: FormData) => {
    dataService.updateFilling(id, body)
      .then(() => updateData()).catch((e) => setError(e));
  };

  const onSetActiveFilling = (_filling: DataFillingsInterface) => {
    setActiveFilling(_filling);
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
        <div
          className="header_contanier">
          <h1 className="heading">
            Начинки
          </h1>
        </div>

        <div
          className="search_btn_container">
          <SearchBar searchTable={searchTable}/>
          <AddNewDataBtn/>
        </div>

        <div>
          {(isActiveAddComponent === true)
            ? <AddNewFilling
              onAddFilling={onAddFilling}/>
            : null}
        </div>

        <div>
          {(isActiveUpdateComponent === true)
            ? <UpdateFilling activeFilling={activeFilling} onUpdate={onUpdateFilling}/>
            : null}
        </div>

        <PaginatedItems
          itemsPerPage={PAGE_SIZE}
          data={fillings}
          count={count}
          onSetPage={onSetPage}
          forcedPage={page}/>

        <table
          id="table"
          className="filling_table">
          <HeaderTable
            columns={COLUMNS_FILLINGS_ADAPTED}
            sorting={sorting}
            sortTable={sortTable}/>
          <BodyTable
            type='filling'
            entries={fillings}
            columns={COLUMNS_FILLINGS}
            onDelete={onDeleteFilling}
            onSetActive={onSetActiveFilling}/>
        </table>

        <PaginatedItems
          itemsPerPage={PAGE_SIZE}
          data={fillings}
          count={count}
          onSetPage={onSetPage}
          forcedPage={page}/>
        {error && <h2 className='error'> Internal server Error </h2>}

      </div>
    </>
  );
};

export default FillingsTable;
