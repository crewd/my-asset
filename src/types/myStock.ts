export type Stock = {
  stockName: string;
  count: number;
  code: string;
  purchasePrice: string | number;
};

export type MyStock = {
  name: string;
  holdingStock: Stock[];
};
