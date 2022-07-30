import { useEffect, useState } from 'react';

const useProfit = (purchasePrice: number, totalPrice: number) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!purchasePrice || !totalPrice) {
      return;
    }
    setValue(totalPrice - purchasePrice);
  }, [purchasePrice, totalPrice]);

  return [value, setValue];
};

export default useProfit;
