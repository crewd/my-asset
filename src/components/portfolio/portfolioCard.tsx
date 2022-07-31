import { useEffect, useState } from 'react';
import { Stock } from '../../types/myStock';
import Box from '../box/Box';

function PortfolioCard({ name, stock }: { name: string; stock: Stock[] }) {
  const [totalPercahsePrice, setTotalPerChasePrice] = useState(0);

  useEffect(() => {
    let priceSum = 0;
    if (stock) {
      stock.map((data) => {
        priceSum += Number(data.purchasePrice) * data.count;
        return;
      });
    }
    setTotalPerChasePrice(priceSum);
  }, [stock]);

  return (
    <Box classname="flex justify-between sm:p-[15px] p-[10px] bg-primary border-1 rounded-lg">
      <p>{name}</p>
      <p>{totalPercahsePrice}</p>
    </Box>
  );
}

export default PortfolioCard;
