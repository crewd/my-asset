import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import PortfolioCard from '../../components/portfolio/portfolioCard';
import useProfit from '../../hooks/useProfit';
import usePurchasePrice from '../../hooks/usePurchasePrice';
import useReturnOfRate from '../../hooks/useReturnOfRate';
import useTotalPrice from '../../hooks/useTotalPrice';
import { chartDataState, myStockState, stockState } from '../../recoils/stock';
import List from '../../components/box/List';
import MyResponsivePie from '../../components/portfolio/MyResponsivePie';
import useTitle from '../../hooks/useTitle';

const Portfolios = () => {
  useTitle('포트폴리오');

  // api 주식 데이터
  const stockData = useRecoilValue(stockState);
  // 보유 주식
  const myStockData = useRecoilValue(myStockState);

  const [chartData, setChartData] = useRecoilState(chartDataState);

  const navigate = useNavigate();

  const [totalAmount] = useTotalPrice(myStockData, stockData);
  const [purchasePrice] = usePurchasePrice(myStockData);
  const [returnRate] = useReturnOfRate(
    Number(purchasePrice),
    Number(totalAmount),
  );
  const [profit] = useProfit(Number(purchasePrice), Number(totalAmount));

  const navigateHandler = (id: number) => {
    navigate(`/portfolio/${id}`);
  };

  useEffect(() => {
    setChartData([]);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-[20px]">
        <div className="m-auto sm:w-[600px] w-full">
          <Box classname=" h-[250px] rounded-xl sm:p-[30px] p-[25px] flex justify-between sm:flex-row flex-col">
            <div className="w-full">
              <div>
                <p className="text-lg">총 보유 자산</p>
                <p className="sm:text-xxl text-[32px] font-bold">
                  {totalAmount.toLocaleString()}원
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
            </div>
          </Box>
        </div>
        <div className="m-auto sm:w-[600px] w-[100%]">
          <p className="py-[10px] text-md">내 포트폴리오</p>
          <div>
            <Box classname="m-auto sm:w-[600px] w-full h-[300px] p-[20px] rounded-t-lg border-b-2 border-primary text-black">
              <div className="sm:w-full w-[200px] h-full m-auto">
                {chartData.length > 0 && <MyResponsivePie data={chartData} />}
              </div>
            </Box>
            {myStockData.length > 0 ? (
              myStockData.map((element) => (
                <PortfolioCard
                  classname="bg-secondary last:rounded-b-xl last:border-none border-b-2 border-primary sm:p-[20px] p-[15px]"
                  key={element.name}
                  name={element.name}
                  stock={element.holdingStock}
                  navigate={() => navigateHandler(element.id)}
                />
              ))
            ) : (
              <List data={['포트폴리오를 추가해보세요!']} />
            )}
          </div>
          <Button classname="">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Portfolios;
