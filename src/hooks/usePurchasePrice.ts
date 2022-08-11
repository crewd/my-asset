import { useEffect, useState } from 'react';
import { MyStock } from '../types/myStock';

const usePurchasePrice = (myStockData: MyStock[]) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!myStockData) {
      return;
    }
    let purchasePriceSum = 0;
    myStockData.map((data) =>
      data.holdingStock.map((stock) => {
        purchasePriceSum += Number(stock.purchasePrice) * stock.count;
        return setValue(purchasePriceSum);
      }),
    );
  }, [myStockData]);

  return [value, setValue];
};

export default usePurchasePrice;
