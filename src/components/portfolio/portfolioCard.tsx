import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useReturnOfRate from '../../hooks/useReturnOfRate';
import { chartDataState, stockState } from '../../recoils/stock';
import { Stock } from '../../types/myStock';

function PortfolioCard({
  name,
  stock,
  classname,
  navigate,
}: {
  name: string;
  stock: Stock[];
  classname: string;
  navigate: () => void;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);

  const stockData = useRecoilValue(stockState);
  const setChartData = useSetRecoilState(chartDataState);

  const [returnOfRate] = useReturnOfRate(purchasePrice, totalPrice);

  const styles = `flex justify-between cursor-pointer ${classname}`;

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
  }, [stockData, stock]);

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

  useEffect(() => {
    if (!purchasePrice) {
      return;
    }
    setChartData((chartData) => [
      ...chartData,
      { id: name, lable: name, value: totalPrice },
    ]);
  }, [purchasePrice]);

  return (
    <div className={styles} onClick={navigate} role="presentation">
      <p>{name}</p>
      <p className="text-regular text-center leading-[27px] ml-1">
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
