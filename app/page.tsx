/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from './store/hooks';
import SearchBar from './components/searchBar';
import BodyTable from './components/table/bodyTable';
import HeaderTable from './components/table/headerTable';
import PaginatedItems from './components/paginate/pagination';
import UpdateOrder from './components/orders/updateOrder';
import { UpdateOrderType, dataService } from './services';
import { COLUMNS_ORDERS, COLUMNS_ORDERS_ADAPTED, PAGE_SIZE } from './constants';
import { useHandlerToken } from './components/useHandlerToken/useHandlerToken';
import { SortingInterface, DataOrdersInterface } from './interfaces/interfaces';

const OrdersTable = () => {
  const [orders, setOrders] = useState<DataOrdersInterface[]>([]);
  const [count, setCount] = useState<number>(0);
  const [sorting, setSorting] = useState<SortingInterface>({ column: 'id', order: 'asc' });
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [activeOrder, setActiveOrder] = useState<DataOrdersInterface | null>(null);
  const [error, setError] = useState<any>(null);

  const { isActiveUpdateComponent } = useAppSelector((state: any) => state.updateDataReducer);

  const [handlerToken] = useHandlerToken();

  const searchTable = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
  };

  const sortTable = (newSorting: SortingInterface) => {
    setSorting(newSorting);
  };

  const updateData = async () => {
    handlerToken();
    const data = await dataService.getOrders(page, sorting, searchValue);

    setCount(data.count);
    setOrders(data.data);
  };

  const onDeleteOrder = (id: number) => {
    const conf = confirm('Вы уверены, что хотите удалить данную запись?');

    if (!conf) {
      return;
    }

    dataService.deleteOrder(id)
      .then(() => updateData()).catch((e) => setError(e));
    updateData();
  };

  const onUpdateOrder = (id: number, body: UpdateOrderType) => {
    dataService.updateOrder(id, body)
      .then(() => updateData()).catch((e) => setError(e));
  };

  const onSetActiveOrder = (order: DataOrdersInterface) => {
    setActiveOrder(order);
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
            Заказы</h1>
        </div>
        <div
          className="search_btn_container">
          <SearchBar searchTable={searchTable}/>
        </div>

        <div>
          {(isActiveUpdateComponent === true)
            ? <UpdateOrder activeOrder={activeOrder} onUpdate={onUpdateOrder}/>
            : null}
        </div>

        <PaginatedItems
          itemsPerPage={PAGE_SIZE}
          data={orders}
          count={count}
          onSetPage={onSetPage}
          forcedPage={page}/>

        <table
          id="table"
          className="oredr_table">
          <HeaderTable
            columns={COLUMNS_ORDERS_ADAPTED}
            sorting={sorting}
            sortTable={sortTable}/>
          <BodyTable
            type='order'
            entries={orders}
            columns={COLUMNS_ORDERS}
            onDelete={onDeleteOrder}
            onSetActive={onSetActiveOrder}/>
        </table>

        <PaginatedItems
          itemsPerPage={PAGE_SIZE}
          data={orders}
          count={count}
          onSetPage={onSetPage}
          forcedPage={page}/>
        {error && <h2 className='error'> Internal server Error </h2>}

      </div>
    </>
  );
};

export default OrdersTable;
