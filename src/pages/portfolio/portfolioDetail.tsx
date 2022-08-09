import { faPlus, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import Modal from '../../components/layout/modal';
import MyResponsivePie from '../../components/portfolio/MyResponsivePie';
import PortfolioDetailCard from '../../components/portfolio/PortfolioDetailCard';
import useProfit from '../../hooks/useProfit';
import { myStockState, stockState } from '../../recoils/stock';
import { ChartDataType, MyStock } from '../../types/myStock';
import { stockStore } from '../../util/stock';

const PortfolioDetail = () => {
  const [portfolio, setPortfolio] = useState<MyStock>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseTotalPrice, setPurchaseTotalPrice] = useState(0);
  const [returnRate, setReturnRate] = useState(0);
  const [chartData, setChartData] = useState<ChartDataType[]>();
  const [removeConfirm, setRemoveConfirm] = useState(false);

  const navigate = useNavigate();

  const store = stockStore;

  const [myStockData, setMyStockData] = useRecoilState(myStockState);
  const stockData = useRecoilValue(stockState);
  const { id } = useParams();
  const [profit] = useProfit(purchaseTotalPrice, totalPrice);

  const openConfirm = () => {
    setRemoveConfirm(true);
  };

  const closeConfirm = () => {
    setRemoveConfirm(false);
  };

  const removeHandler = () => {
    store.remove(portfolio.name);
    setMyStockData(() =>
      myStockData.filter((data) => data.name !== portfolio.name),
    );
  };

  useEffect(() => {
    if (
      portfolio &&
      myStockData &&
      !myStockData.find((data) => data.name === portfolio.name)
    ) {
      navigate('/portfolio');
    }
  }, [myStockData]);

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
    if (!purchaseTotalPrice && !totalPrice) {
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
          <header className="pb-[20px] flex">
            <button
              className="text-xl font-bold"
              type="button"
              onClick={() => navigate('/portfolio')}
            >
              <FontAwesomeIcon icon={faAngleLeft} /> {portfolio.name}
            </button>
            <button
              type="button"
              className="ml-[30px] border-2 border-secondary w-[80px] py-[5px] hover:bg-minus rounded-lg"
              onClick={openConfirm}
            >
              삭제
            </button>
          </header>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-[20px]">
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
            <Box classname="h-[250px] p-[20px] rounded-xl">
              {chartData.length > 0 ? (
                <MyResponsivePie data={chartData} />
              ) : (
                <h2 className="text-xl h-full font-bold flex col justify-center items-center">
                  종목을 추가해보세요!
                </h2>
              )}
            </Box>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-[20px]">
            <h2 className="mt-[20px] md:col-span-2 col-span-1 text-xl font-bold">
              보유 종목
            </h2>
            {portfolio &&
              stockData &&
              stockData.map((stock) =>
                portfolio.holdingStock.map((data) => {
                  if (stock.itmsNm === data.stockName) {
                    return (
                      <PortfolioDetailCard
                        key={data.code}
                        stock={data}
                        marketValue={Number(stock.clpr)}
                      />
                    );
                  }
                  return false;
                }),
              )}
            {!chartData.length && (
              <Box classname="col-span-2 p-[20px] rounded-xl text-center text-md">
                종목을 추가해보세요!
              </Box>
            )}
          </div>
          <Button classname="">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
          {removeConfirm && (
            <Modal cssStyle="min-w-[290px]">
              <p className="text-md p-[20px] text-center">
                포트폴리오를 삭제하시겠습니까?
              </p>
              <div className="flex justify-around py-[20px]">
                <button
                  className="w-[80px] py-[10px] rounded-lg border-2 border-slate-500 hover:bg-slate-500 shadow-xl hover:scale-105"
                  type="button"
                  onClick={closeConfirm}
                >
                  아니오
                </button>
                <button
                  className="w-[80px] py-[10px] rounded-lg bg-minus hover:scale-105 shadow-xl"
                  type="button"
                  onClick={removeHandler}
                >
                  삭제
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default PortfolioDetail;
