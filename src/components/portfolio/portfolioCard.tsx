import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useReturnOfRate from '../../hooks/useReturnOfRate';
import { stockState } from '../../recoils/stock';
import { Stock } from '../../types/myStock';

function PortfolioCard({ name, stock }: { name: string; stock: Stock[] }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);

  const stockData = useRecoilValue(stockState);

  const [returnOfRate] = useReturnOfRate(purchasePrice, totalPrice);

  useEffect(() => {
    if (!stockData || !stock) {
      return;
    }
    let priceSum = 0;
    stockData.map((data) => {
      stock.map((myStock) => {
        if (data.itmsNm === myStock.stockName) {
          priceSum += myStock.count * Number(data.clpr);
        }
        return;
      });
      return;
    });
    setTotalPrice(priceSum);
  });

  useEffect(() => {
    if (!totalPrice) {
      return;
    }
    let purchasePriceSum = 0;
    stock.map((data) => {
      purchasePriceSum += Number(data.purchasePrice) * data.count;
      return;
    });
    setPurchasePrice(purchasePriceSum);
  }, [totalPrice]);

  return (
    <div className="flex justify-between sm:p-[15px] p-[10px] bg-primary">
      <p>{name}</p>
      <p className="text-regular leading-[27px]">
        ₩ {totalPrice} (
        <span
          className={`${
            returnOfRate < 0
              ? 'text-minus'
              : returnOfRate > 0
              ? 'text-plus'
              : 'text-white'
          }`}
        >
          {returnOfRate.toLocaleString()}%
        </span>
        )
      </p>
    </div>
  );
}

export default PortfolioCard;
