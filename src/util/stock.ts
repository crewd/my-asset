import { Stock } from '../types/myStock';

export const stockStore = {
  set: (name: string, portfolio: Stock[]) => {
    if (!portfolio) {
      return;
    }
    localStorage.setItem(name, JSON.stringify(portfolio));
  },
  get: (name: string) => localStorage.getItem(name),
  get allStock() {
    return localStorage;
  },
};
