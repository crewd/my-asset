import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Box from '../../components/box/Box';
import MyResponsivePie from '../../components/portfolio/MyResponsivePie';
import useProfit from '../../hooks/useProfit';
import { myStockState, stockState } from '../../recoils/stock';
import { ChartDataType, MyStock } from '../../types/myStock';

const PortfolioDetail = () => {
  const [portfolio, setPortfolio] = useState<MyStock>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseTotalPrice, setPurchaseTotalPrice] = useState(0);
  const [returnRate, setReturnRate] = useState(0);

  const [chartData, setChartData] = useState<ChartDataType[]>();

  const myStockData = useRecoilValue(myStockState);
  const stockData = useRecoilValue(stockState);
  const { id } = useParams();
  const [profit] = useProfit(purchaseTotalPrice, totalPrice);

  useEffect(() => {
    setChartData([]);
  }, []);

  useEffect(() => {
    if (myStockData && stockData) {
      const portfolioData = myStockData?.filter(
        (data) => data.id === Number(id),
      );
      setPortfolio(portfolioData[0]);
    }
  }, [myStockData]);

  useEffect(() => {
    if (!portfolio || !stockData) {
      return;
    }
    let priceSum = 0;
    stockData.map((stock) => {
      portfolio.holdingStock.map((hStock) => {
        if (hStock.stockName === stock.itmsNm) {
          priceSum += hStock.count * Number(stock.clpr);
        }
        return;
      });
      return;
    });
    setTotalPrice(priceSum);
  }, [portfolio, stockData]);

  useEffect(() => {
    if (!portfolio || !stockData) {
      return;
    }
    const chartArray: ChartDataType[] = [];
    stockData.map((data) =>
      portfolio.holdingStock.map((holding) => {
        if (data.itmsNm === holding.stockName) {
          chartArray.push({
            id: holding.stockName,
            lable: holding.stockName,
            value: Number(Number(data.clpr) * holding.count),
          });
          return;
        }
        return;
      }),
    );
    setChartData(chartArray);
  }, [portfolio, stockData]);

  useEffect(() => {
    if (!portfolio) {
      return;
    }
    let purchasePriceSum = 0;
    portfolio.holdingStock.map((holding) => {
      purchasePriceSum += Number(holding.purchasePrice) * holding.count;
      return setPurchaseTotalPrice(purchasePriceSum);
    });
  }, [portfolio]);

  useEffect(() => {
    if (!purchaseTotalPrice || !totalPrice) {
      return;
    }
    setReturnRate(
      ((totalPrice - purchaseTotalPrice) / purchaseTotalPrice) * 100,
    );
  }, [purchaseTotalPrice, totalPrice]);

  return (
    <>
      {portfolio && (
        <div>
          <header className="pb-[20px]">
            <h1 className="text-xl font-bold">{portfolio.name}</h1>
          </header>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-[24px]">
            <Box classname="h-[250px] rounded-xl sm:p-[30px] p-[25px] ">
              <div>
                <p className="text-lg">총 보유 자산</p>
                <p className="sm:text-xxl text-[32px] font-bold">
                  {totalPrice.toLocaleString()}원
                </p>
              </div>
              <div className="mt-8 flex justify-between">
                <p className="text-md">수익률</p>
                <p
                  className={`font-bold text-lg ${
                    returnRate < 0
                      ? 'text-minus'
                      : returnRate > 0
                      ? 'text-plus'
                      : 'text-white'
                  }`}
                >
                  {Number(returnRate).toFixed(2)}%
                </p>
              </div>
              <div className="mt-[10px] flex justify-between">
                <p className="text-md">평가 손익</p>
                <p
                  className={`font-bold text-lg ${
                    profit < 0
                      ? 'text-minus'
                      : profit > 0
                      ? 'text-plus'
                      : 'text-white'
                  }`}
                >
                  {profit ? profit.toLocaleString() : 0}원
                </p>
              </div>
            </Box>
            <Box classname="p-[20px] rounded-xl">
              {chartData && <MyResponsivePie data={chartData} />}
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioDetail;
