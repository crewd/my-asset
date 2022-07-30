import { useEffect, useState } from 'react';

const useReturn = (purchasePrice: number, totalPrice: number) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!purchasePrice || !totalPrice) {
      return;
    }
    setValue(((totalPrice - purchasePrice) / purchasePrice) * 100);
  }, [purchasePrice, totalPrice]);

  return [value, setValue];
};

export default useReturn;