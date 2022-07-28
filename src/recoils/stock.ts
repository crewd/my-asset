import { atom } from 'recoil';
import { Stock } from '../types/apiType';

export const stockState = atom<Stock[]>({
  key: 'stockState',
  default: [],
});
