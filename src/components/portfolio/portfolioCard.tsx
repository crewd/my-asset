import { useEffect, useState } from 'react';
import { stock } from '../../types/myStock';
import Box from '../box/Box';

const PortfolioCard = ({ name, stock }: { name: string; stock: stock[] }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <Box classname="flex justify-between sm:p-[15px] p-[10px] bg-primary border-1 rounded-lg">
      <p>{name}</p>
    </Box>
  );
};

export default PortfolioCard;
