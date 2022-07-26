import { Link } from 'react-router-dom';
import Box from '../components/layout/box/Box';

const myData = [
  {
    name: 'a',
    stock: [
      {
        stockName: '삼성전자',
        count: 50,
        price: '90000',
      },
      {
        stockName: 'lg생활건강',
        count: 50,
        price: '760000',
      },
    ],
  },
  {
    name: 'b',
    stock: [
      {
        stockName: '아시아나항공',
        count: 20,
        price: '13000',
      },
      {
        stockName: '대한항공',
        count: 30,
        price: '28000',
      },
    ],
  },
];

function MainPage() {
  const myStockNames: string[] = [];
  const myStockPrice: number[] = [];

  myData.map((portfolio) =>
    portfolio.stock.map(
      (stock) => (
        myStockNames.push(stock.stockName),
        myStockPrice.push(Number(stock.price))
      ),
    ),
  );

  const totalPrice = myStockPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  );

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-[10px]">
        <Link to="/portfolio">
          <Box classname="w-[100%] h-[300px] rounded-xl p-[30px]">
            <div>
              <p className="text-lg">총 보유 자산</p>
              <p className="text-xxl">{totalPrice.toLocaleString()}원</p>
            </div>
            <div className="mt-[20px] text-lg flex justify-between">
              <p>수익률</p>
              <p>99%</p>
            </div>
            <div className="mt-[10px] text-lg flex justify-between">
              <p>평가 손익</p>
              <p>99999원</p>
            </div>
          </Box>
        </Link>
        <div className="grid grid-cols-2 gap-[10px]">
          <Box classname="w-[100%] h-[180px] rounded-xl col-span-2">
            포트폴리오 바로가기
          </Box>
          <Link to="/favorites">
            <Box classname="w-[100%] h-[110px] rounded-xl">관심종목</Box>
          </Link>
          <Link to="/search">
            <Box classname="w-[100%] h-[110px] rounded-xl">종목 검색</Box>
          </Link>
        </div>
      </div>
      <div className="my-[40px]">
        <p className="p-[5px] text-center">거래량 TOP 10</p>
        <div className="mt-[15px]">
          <Box classname="p-[15px] rounded-t-xl border-b-2 border-primary">
            first
          </Box>
          <Box classname="p-[15px] border-b-2 border-primary">2</Box>
          <Box classname="p-[15px] rounded-b-xl">last</Box>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
