import { useEffect, useState } from 'react';
import { Stock } from '../types/apiType';
import { MyStock } from '../types/myStock';

const useTotalPrice = (myStockData: MyStock[], stockData: Stock[]) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (!stockData || !myStockData) {
      return;
    }
    let priceSum = 0;
    stockData.map((stock) => {
      myStockData.map((mStock) => {
        mStock.holdingStock.map((hStock) => {
          if (hStock.stockName === stock.itmsNm) {
            priceSum += hStock.count * Number(stock.clpr);
          }
          return;
        });
        return;
      });
      return;
    });
    setValue(priceSum);
  }, [myStockData, stockData]);

  return [value, setValue];
};

export default useTotalPrice;
