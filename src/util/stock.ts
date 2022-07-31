import { MyStock } from '../types/myStock';

export const stockStore = {
  set: (name: string, portfolio: MyStock) => {
    if (!portfolio) {
      return;
    }
    localStorage.setItem(name, JSON.stringify(portfolio));
  },
  get: (name: string) => localStorage.getItem(name),
};
