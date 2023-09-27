import qs from 'qs';
import { PAGE_SIZE } from '../constants';
import { SortingInterface, DataOrdersInterface } from '../interfaces';
import { DataCakesInterface } from '../cakes/types';
import { DataFillingsInterface } from '../fillings/types';
import {
  AddNewCakeInterface,
  AddNewFillingInterface,
  PaginatedResponse,
  UpdateCakeInterface,
  UpdateFillingInterface,
  UpdateOrderInterface,
  UpdateOrderType,
} from './types';
import { authSession } from './authSession';

export interface ParamsInterface {
  path: string;
  params?: any;
  method?: 'get' | 'post' | 'put' | 'delete';
  headers?: any;
  body?: any;
  isPrivateMethod?: boolean;
}

class DataService {
  baseUrl: string;

  constructor () {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3010';
  }

  public async makeRequest ({
    path,
    params,
    method = 'get',
    headers = {},
    body,
    isPrivateMethod = true,
  }: ParamsInterface) {
    const pathWithQuery = params ? path + this.getQueryStr(params) : path;

    const accessToken = authSession.getAccessToken();

    const response = await fetch(`${this.baseUrl}${pathWithQuery}`, {
      method,
      headers: isPrivateMethod
        ? {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        }
        : headers,
      body,
    });

    if (!response.ok) {
      throw new Error('Ошибка HTTP: ' + response.status);
    }

    const data = await response.text();

    return data === ''
      ? {}
      : JSON.parse(data);
  }

  public getOffset (page: number) {
    return (page - 1) * PAGE_SIZE;
  }

  public getQueryStr (params: Record<string, any>) {
    return qs.stringify(params, { addQueryPrefix: true });
  }

  public async getOrders (
    page: number,
    sorting: SortingInterface,
    searchValue: string,
  ): Promise<PaginatedResponse<DataOrdersInterface>> {
    const params = {
      sort: sorting.column,
      order: sorting.order,
      search: searchValue,
      limit: PAGE_SIZE,
      offset: this.getOffset(page),
    };

    const response = await this.makeRequest({
      path: '/order',
      params,
    });

    return response;
  }

  public async getCakes (
    page: number,
    sorting: SortingInterface,
    searchValue: string): Promise<PaginatedResponse<DataCakesInterface>> {
    const params = {
      sort: sorting.column,
      order: sorting.order,
      search: searchValue,
      limit: PAGE_SIZE,
      offset: this.getOffset(page),
    };

    const response = await this.makeRequest({
      path: '/cake',
      params,
    });

    return response;
  }

  public async getFillings (
    page: number,
    sorting: SortingInterface,
    searchValue: string): Promise<PaginatedResponse<DataFillingsInterface>> {
    const params = {
      sort: sorting.column,
      order: sorting.order,
      search: searchValue,
      limit: PAGE_SIZE,
      offset: this.getOffset(page),
    };

    const response = await this.makeRequest({
      path: '/cake-filling',
      params,
    });

    return response;
  }

  public async addNewCake (body: FormData): Promise<AddNewCakeInterface> {
    const response = await this.makeRequest({
      path: '/cake',
      method: 'post',
      body,
    });

    return response;
  }

  public async addNewFilling (body: FormData): Promise<AddNewFillingInterface> {
    const response = await this.makeRequest({
      path: '/cake-filling',
      method: 'post',
      body,
    });

    return response;
  }

  public async deleteOrder (id: number) {
    const response = await this.makeRequest({
      path: `/order/${id}`,
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }

  public async deleteCake (id: number) {
    const response = await this.makeRequest({
      path: `/cake/${id}`,
      method: 'delete',
    });

    return response;
  }

  public async deleteFilling (id: number) {
    const response = await this.makeRequest({
      path: `/cake-filling/${id}`,
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }

  public async updateOrder (id: number, body: UpdateOrderType): Promise<UpdateOrderInterface> {
    const response = await this.makeRequest({
      path: `/order/${id}`,
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }

  public async updateCake (id: number, body: FormData): Promise<UpdateCakeInterface> {
    const response = await this.makeRequest({
      path: `/cake/${id}`,
      method: 'put',
      body,
    });

    return response;
  }

  public async updateFilling (id: number, body: FormData): Promise<UpdateFillingInterface> {
    const response = await this.makeRequest({
      path: `/cake-filling/${id}`,
      method: 'put',
      body,
    });

    return response;
  }

  public async auth (email: string, password: string) {
    const response = await this.makeRequest({
      path: '/auth/login',
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      isPrivateMethod: false,
    });

    return response;
  }

  public async checkUser () {
    const response = await this.makeRequest({
      path: '/admin-user',
      method: 'post',
    });

    return response;
  }
}
export const dataService = new DataService();
