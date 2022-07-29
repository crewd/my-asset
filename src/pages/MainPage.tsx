import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Box from '../components/box/Box';
import List from '../components/box/List';
import { myStockState, stockState } from '../recoils/stock';

function MainPage() {
  // 총 보유 자산
  const [totalPrice, setTotlaPrice] = useState(0);
  // 현재 주식 가격 총합
  const [stockTotalPrice, setStockTotalPrice] = useState(0);
  // 평단가
  const [averagePrice, setAveragePrice] = useState(0);
  //수익률
  const [stockRate, setStockRate] = useState(0);
  // 실현손익
  const [profit, setProfit] = useState(0);
  // 구매 수량
  const [stockCount, setStockCount] = useState(0);

  // api 주식 데이터
  const [stockData, setStockData] = useRecoilState(stockState);
  // 보유 주식
  const [myStockData, setMyStockData] = useRecoilState(myStockState);

  const minusRegex = /-/g;

  const holdings = myStockData.map((v) => {
    return v.holdingStock.map((value) => {
      return value;
    });
  });

  const holdingsLength = holdings.map((v) => v.length);

  let holdingsLengthSum = 0;

  holdingsLength.forEach((length) => {
    holdingsLengthSum += length;
  });

  useEffect(() => {
    setTotlaPrice(0);
    setStockRate(0);
    setProfit(0);
  }, []);

  useEffect(() => {
    if (stockData.length !== holdingsLengthSum) {
      return;
    }
    let priceSum = 0;
    stockData.map((stock) => {
      myStockData.map((mStock) => {
        mStock.holdingStock.map((hStock) => {
          if (hStock.stockName !== stock.itmsNm) {
            return;
          }
          priceSum += hStock.count * Number(stock.clpr);
        });
      });
    });
    setTotlaPrice(priceSum);
  }, [stockData]);

  // useEffect(() => {
  //   if (stockData.length !== holdingsLengthSum) {
  //     return;
  //   }
  //   let stockPriceSum = 0;
  //   stockData.map((stock) => (stockPriceSum += Number(stock.clpr)));
  //   setStockTotalPrice(stockPriceSum / holdingsLengthSum);
  // }, [totalPrice]);

  useEffect(() => {
    if (!totalPrice) {
      return;
    }
    let purchasePriceSum = 0;
    myStockData.map((data) =>
      data.holdingStock.map(
        (stock) =>
          (purchasePriceSum += Number(stock.purchasePrice) * stock.count),
      ),
    );
    setAveragePrice(purchasePriceSum);
  }, [totalPrice]);

  // useEffect(() => {
  //   if (!stockTotalPrice) {
  //     return;
  //   }
  //   let myStockPriceSum = 0;
  //   myStockData.map((data) =>
  //     data.holdingStock.map(
  //       (stock) => (myStockPriceSum += Number(stock.purchasePrice)),
  //     ),
  //   );

  //   setAveragePrice(myStockPriceSum);
  // }, [stockTotalPrice]);

  useEffect(() => {
    if (!averagePrice) {
      return;
    }
    setStockRate(((totalPrice - averagePrice) / averagePrice) * 100);
  }, [averagePrice]);

  useEffect(() => {
    if (!stockRate) {
      return;
    }
    let totalCount = 0;
    myStockData.map((data) =>
      data.holdingStock.map((stock) => (totalCount += stock.count)),
    );
    setStockCount(totalCount / holdingsLengthSum);
  }, [stockRate]);

  // useEffect(() => {
  //   if (!stockRate) {
  //     return;
  //   }
  //   myStockData.map((data) =>
  //     data.holdingStock.map((stock) =>
  //       setStockCount((stockCount) => (stockCount += stock.count)),
  //     ),
  //   );
  // }, [stockRate]);

  useEffect(() => {
    if (!stockCount) {
      return;
    }
    setProfit(totalPrice - averagePrice);
  }, [stockCount]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-[10px]">
        <Link to="/portfolio">
          <Box classname="w-[100%] h-[300px] rounded-xl p-[30px]">
            <div>
              <p className="text-lg">총 보유 자산</p>
              <p className="text-xxl font-bold">
                {totalPrice.toLocaleString()}원
              </p>
            </div>
            <div className="mt-[20px] flex justify-between">
              <p className="text-md">수익률</p>
              <p
                className={`font-bold text-lg ${
                  stockRate < 0
                    ? 'text-minus'
                    : stockRate > 0
                    ? 'text-plus'
                    : 'text-white'
                }`}
              >
                {stockRate.toFixed(2)}%
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
                {profit != NaN ? profit.toLocaleString() : 0}원
              </p>
            </div>
          </Box>
        </Link>
        <div className="grid grid-cols-2 gap-[10px]">
          <Box classname="w-[100%] h-[180px] rounded-xl col-span-2 p-[20px] text-center text-md">
            포트폴리오 바로가기
          </Box>
          <Link to="/favorites">
            <Box classname="w-[100%] h-[110px] rounded-xl text-md flex justify-center items-center">
              <div>
                <FontAwesomeIcon
                  className="mr-3 text-red-500"
                  icon={faHeart}
                  size="lg"
                />
                관심종목
              </div>
            </Box>
          </Link>
          <Link to="/search">
            <Box classname="w-[100%] h-[110px] rounded-xl text-md flex justify-center items-center">
              <div>
                <FontAwesomeIcon
                  className="mr-3"
                  icon={faMagnifyingGlass}
                  size="lg"
                />
                종목 검색
              </div>
            </Box>
          </Link>
        </div>
      </div>
      <div className="my-[40px]">
        <p className="p-[5px] text-center text-xl font-semibold">
          거래량 TOP 10
        </p>
        <div className="mt-[15px]">
          <List data={['코드', '주식명', '종가', '등락률']} />
          <List data={['1', '2', '3', '4']} />
          <List data={[5, 6, 7, 8]} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
