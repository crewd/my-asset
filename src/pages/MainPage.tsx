import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Box from '../components/box/Box';
import List from '../components/box/List';
import PortfolioCard from '../components/portfolio/portfolioCard';
import useProfit from '../hooks/useProfit';
import usePurchasePrice from '../hooks/usePurchasePrice';
import useReturnOfRate from '../hooks/useReturnOfRate';
import useTotalPrice from '../hooks/useTotalPrice';
import { myStockState, stockState } from '../recoils/stock';

const MainPage: React.FC = () => {
  // api 주식 데이터
  const stockData = useRecoilValue(stockState);
  // 보유 주식
  const myStockData = useRecoilValue(myStockState);

  // 총 보유 자산
  const [totalAmount] = useTotalPrice(myStockData, stockData);
  // 구매가격 총합
  const [purchasePrice] = usePurchasePrice(myStockData);
  // 수익률
  const [returnRate] = useReturnOfRate(
    Number(purchasePrice),
    Number(totalAmount),
  );
  // 평가 손익
  const [profit] = useProfit(Number(purchasePrice), Number(totalAmount));

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-[10px]">
        <Link to="/portfolio">
          <Box classname="w-[100%] h-[300px] rounded-xl p-[30px]">
            <div>
              <p className="text-lg">총 보유 자산</p>
              <p className="text-xxl font-bold">
                {totalAmount.toLocaleString()}원
              </p>
            </div>
            <div className="mt-[20px] flex justify-between">
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
        </Link>
        <div className="grid grid-cols-2 gap-[10px]">
          <Box classname="w-[100%] h-[180px] rounded-xl col-span-2 p-[10px] text-center text-md flex flex-col justify-center items-center">
            <p className="mb-[20px]"> 포트폴리오 바로가기</p>
            <Slider
              className="sm:w-[90%] w-[85%]"
              dots
              infinite
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {myStockData.map((data) => (
                <PortfolioCard
                  key={data.name}
                  name={data.name}
                  stock={data.holdingStock}
                />
              ))}
            </Slider>
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
};

export default MainPage;
