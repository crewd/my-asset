import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stock } from '../../types/myStock';
import Box from '../box/Box';

const PortfolioDetailCard = ({
  stock,
  marketValue,
}: {
  stock: Stock;
  marketValue: number;
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    if (stock && marketValue) {
      setTotalPrice(stock.count * marketValue);
    }
  }, [stock, marketValue]);

  useEffect(() => {
    if (totalPrice) {
      setPurchasePrice(stock.count * Number(stock.purchasePrice));
    }
  }, [totalPrice]);

  useEffect(() => {
    if (totalPrice && purchasePrice) {
      setRate(((totalPrice - purchasePrice) / purchasePrice) * 100);
    }
  }, [totalPrice, purchasePrice]);

  useEffect(() => {
    if (totalPrice && purchasePrice) {
      setProfit(totalPrice - purchasePrice);
    }
  }, [totalPrice, purchasePrice]);

  return (
    <Link to={`/stock/${stock.code}`}>
      <Box classname="rounded-xl">
        <div className="flex justify-between border-b-2 border-primary p-[20px] text-md">
          <p>{stock.stockName}</p>
          <p>보유수량: {stock.count}</p>
        </div>

        <div className="p-[20px] text-md">
          <div className="flex justify-between p-[5px]">
            <p>평가손익</p>
            <p
              className={`ml-[10px] ${
                profit < 0
                  ? 'text-minus'
                  : profit > 0
                  ? 'text-plus'
                  : 'text-white'
              }`}
            >
              {profit.toLocaleString()} 원
            </p>
          </div>
          <div className="flex justify-between p-[5px]">
            <p>수익률 </p>
            <p
              className={`ml-[10px] ${
                rate < 0 ? 'text-minus' : rate > 0 ? 'text-plus' : 'text-white'
              }`}
            >
              {rate.toFixed(2)} %
            </p>
          </div>
          <div className="flex justify-between p-[5px]">
            <p>현재가 </p>
            <p>{marketValue.toLocaleString()} 원</p>
          </div>
          <div className="flex justify-between p-[5px]">
            <p>매수금액 </p>
            <p>{purchasePrice.toLocaleString()} 원</p>
          </div>
          <div className="flex justify-between p-[5px]">
            <p>매수평균가 </p>
            <p> {Number(stock.purchasePrice).toLocaleString()} 원</p>
          </div>
          <div className="flex justify-between p-[5px]">
            <p>평가금액 </p>
            <p>{totalPrice.toLocaleString()} 원</p>
          </div>
        </div>
      </Box>
    </Link>
  );
};

export default PortfolioDetailCard;
