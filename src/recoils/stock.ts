import { atom } from 'recoil';
import { Stock } from '../types/apiType';
import { MyStock } from '../types/myStock';

export const stockState = atom<Stock[]>({
  key: 'stockState',
  default: [],
});

export const myStockState = atom<MyStock[]>({
  key: 'myStockState',
  default: [],
});
