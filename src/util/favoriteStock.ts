export const favStockStore = {
  set: (code: string[]) => {
    localStorage.setItem('favoriteStocks', JSON.stringify(code));
  },
  get: () => JSON.parse(localStorage.getItem('favoriteStocks')),
};
