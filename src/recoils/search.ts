import { atom } from 'recoil';
import { Stock } from '../types/apiType';

export const searchValueState = atom<Stock[]>({
  key: 'searchValueState',
  default: [],
});
