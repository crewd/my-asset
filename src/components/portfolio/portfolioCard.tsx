import { useEffect, useState } from 'react';
import { Stock } from '../../types/myStock';
import Box from '../box/Box';

function PortfolioCard({ name, stock }: { name: string; stock: Stock[] }) {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <Box classname="flex justify-between sm:p-[15px] p-[10px] bg-primary border-1 rounded-lg">
      <p>{name}</p>
    </Box>
  );
}

export default PortfolioCard;
