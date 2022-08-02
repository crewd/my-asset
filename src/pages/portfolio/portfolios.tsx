import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Box from '../../components/box/Box';
import useProfit from '../../hooks/useProfit';
import usePurchasePrice from '../../hooks/usePurchasePrice';
import useReturnOfRate from '../../hooks/useReturnOfRate';
import useTotalPrice from '../../hooks/useTotalPrice';
import { myStockState, stockState } from '../../recoils/stock';

const Portfolios = () => {
  // api 주식 데이터
  const stockData = useRecoilValue(stockState);
  // 보유 주식
  const myStockData = useRecoilValue(myStockState);

  const [totalAmount] = useTotalPrice(myStockData, stockData);
  const [purchasePrice] = usePurchasePrice(myStockData);
  const [returnRate] = useReturnOfRate(
    Number(purchasePrice),
    Number(totalAmount),
  );
  const [profit] = useProfit(Number(purchasePrice), Number(totalAmount));

  return (
    <div>
      <div className="">
        <Link to="/portfolios">
          <Box classname="w-[100%] h-[250px] rounded-xl sm:p-[30px] p-[25px] flex justify-between">
            <div className="w-[40%]">
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
            <ul className="w-[30%] list-disc">
              {myStockData.map((portfolio) => (
                <li key={portfolio.name} className="p-[5px]">
                  {portfolio.name}
                </li>
              ))}
            </ul>
          </Box>
        </Link>
      </div>
    </div>
  );
};

export default Portfolios;
