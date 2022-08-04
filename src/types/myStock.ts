export type Stock = {
  stockName: string;
  count: number;
  code: string;
  purchasePrice: string | number;
};

export type MyStock = {
  id: number;
  name: string;
  holdingStock: Stock[];
};

export type ChartDataType = {
  id: string;
  lable: string;
  value: number;
};
