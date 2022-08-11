import { faPlus, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useQueries } from '@tanstack/react-query';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import Modal from '../../components/layout/modal';
import MyResponsivePie from '../../components/portfolio/MyResponsivePie';
import PortfolioDetailCard from '../../components/portfolio/PortfolioDetailCard';
import useProfit from '../../hooks/useProfit';
import { myStockState } from '../../recoils/stock';
import {
  ChartDataType,
  MyStock,
  Stock as HoldingStock,
} from '../../types/myStock';
import { stockStore } from '../../util/stock';
import SearchModal from '../../components/search/searchModal';
import { stockCodeSearch } from '../../api';
import { Stock } from '../../types/apiType';

const PortfolioDetail = () => {
  const [portfolio, setPortfolio] = useState<MyStock>(null);

  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseTotalPrice, setPurchaseTotalPrice] = useState(0);
  const [returnRate, setReturnRate] = useState(0);

  const [chartData, setChartData] = useState<ChartDataType[]>();

  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeStock, setRemoveStock] = useState(false);

  const [addView, setAddView] = useState(false);
  const [updateStock, setUpdateStock] = useState(false);
  const [openButton, setOpenButton] = useState(-1);

  const [stockCount, setStockCount] = useState(0);
  const [updatePrice, setUpdatePrice] = useState(0);
  const [beforeData, setBeforeData] = useState<HoldingStock>();

  const [removeData, setRemoveData] = useState('');

  const [myStockCodes, setMycodes] = useState<string[]>([]);

  const [stockApiData, setStockApiData] = useState<Stock[]>([]);

  const navigate = useNavigate();

  const store = stockStore;

  const [myStockData, setMyStockData] = useRecoilState(myStockState);

  const openUpdateHandler = (data: HoldingStock) => {
    setBeforeData(data);
  };

  const openButtonHandler = (index: number) => {
    if (openButton >= 0) {
      return setOpenButton(-1);
    }
    return setOpenButton(index);
  };

  useEffect(() => {
    if (beforeData) {
      setUpdateStock(true);
      setStockCount(beforeData.count);
      setUpdatePrice(Number(beforeData.purchasePrice));
    }
  }, [beforeData]);

  useEffect(() => {
    if (!updateStock) {
      setBeforeData(null);
    }
  }, [updateStock]);

  useEffect(() => {
    if (myStockData && portfolio) {
      myStockData.map((myStock) => {
        if (myStock.name === portfolio.name) {
          myStock.holdingStock.map((stock) =>
            setMycodes((code) => [...code, stock.code]),
          );
        }
        return;
      });
    }
  }, [portfolio, myStockData]);

  const query = myStockCodes.map((code) => ({
    queryKey: ['portfolioCode', code],
    queryFn: () => stockCodeSearch(code),
  }));

  const results = useQueries({
    queries: [...query],
  });

  const allSuccess = results.every((num) => num.isSuccess === true);

  useEffect(() => {
    if (allSuccess) {
      results.map((data) =>
        setStockApiData((sData) => [...sData, data.data[0]]),
      );
    }
  }, [allSuccess]);

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
    setMyStockData((sdata) =>
      sdata.filter((data) => data.name !== portfolio.name),
    );
  };

  const closeView = () => {
    setAddView(false);
  };

  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setStockCount(Number(onlyNumber));
  };

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setUpdatePrice(Number(onlyNumber));
  };

  const openDelete = (name: string) => {
    setRemoveData(name);
  };

  useEffect(() => {
    if (removeData) {
      setRemoveStock(true);
    }
  }, [removeData]);

  const updatePortfolio = (name: string, count: number, price: number) => {
    if (count === 0 || price === 0) {
      return;
    }

    const newArray: HoldingStock[] = [];
    portfolio.holdingStock.forEach((holding) => {
      if (holding.stockName === name) {
        return newArray.push({
          stockName: holding.stockName,
          code: holding.code,
          count,
          purchasePrice: price,
        });
      }
      return newArray.push(holding);
    });
    setPortfolio({
      id: portfolio.id,
      name: portfolio.name,
      holdingStock: newArray,
    });
  };

  const deleteStock = () => {
    const newArray: HoldingStock[] = [];
    portfolio.holdingStock.forEach((holding) => {
      if (holding.stockName === removeData) {
        return;
      }
      newArray.push(holding);
    });

    setPortfolio({
      id: portfolio.id,
      name: portfolio.name,
      holdingStock: newArray,
    });
  };

  useEffect(() => {
    if (portfolio) {
      store.remove(portfolio.name);
      store.set(portfolio.name, portfolio);
      setUpdateStock(false);
      setRemoveStock(false);
    }
  }, [portfolio]);

  useEffect(() => {
    if (!updateStock) {
      setStockCount(0);
      setUpdatePrice(0);
    }
  }, [updateStock]);

  useEffect(() => {
    if (portfolio && myStockData) {
      const findPortfolio = myStockData.findIndex(
        (data) => data.name === portfolio.name && data.id === portfolio.id,
      );
      if (findPortfolio === -1) {
        navigate('/portfolio');
      }
    }
  }, [myStockData]);

  useEffect(() => {
    setChartData([]);
  }, []);

  useEffect(() => {
    if (myStockData && id) {
      const portfolioData = myStockData.filter(
        (data) => data.id === Number(id),
      );
      setPortfolio(portfolioData[0]);
    }
  }, [myStockData]);

  useEffect(() => {
    if (!portfolio) {
      return;
    }
    if (!stockApiData) {
      return;
    }
    let priceSum = 0;
    portfolio.holdingStock.map((hStock) => {
      stockApiData.map((stock) => {
        if (hStock.stockName === stock.itmsNm) {
          priceSum += hStock.count * Number(stock.clpr);
        }
        return;
      });
      return;
    });
    setTotalPrice(priceSum);
  }, [portfolio, stockApiData]);

  useEffect(() => {
    if (!portfolio) {
      return;
    }
    if (!stockApiData) {
      return;
    }
    const chartArray: ChartDataType[] = [];
    stockApiData.map((data) =>
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
  }, [portfolio, stockApiData]);

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
              className="ml-[30px] border-2 border-[#3c5069] w-[80px] py-[5px] hover:bg-minus hover:border-minus rounded-lg"
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
              stockApiData &&
              stockApiData.map((stock, index) =>
                portfolio.holdingStock.map((data) => {
                  if (stock.itmsNm === data.stockName) {
                    return (
                      <div key={data.code}>
                        <PortfolioDetailCard
                          stock={data}
                          marketValue={Number(stock.clpr)}
                          open={() => openButtonHandler(index)}
                        />
                        {openButton === index && (
                          <div className="flex justify-start my-[10px]">
                            <button
                              className="w-[80px] bg-secondary h-[40px] rounded-md hover:bg-[#3c5069]"
                              type="button"
                              onClick={() => openUpdateHandler(data)}
                            >
                              수정
                            </button>
                            <button
                              className="w-[80px] bg-minus h-[40px] rounded-md ml-[15px] hover:scale-110"
                              type="button"
                              onClick={() => openDelete(data.stockName)}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
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
          <Button classname="m-[20px]" clickEvent={() => setAddView(true)}>
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
          {removeConfirm && (
            <Modal cssStyle="min-w-[290px]">
              <p className="text-md p-[20px] text-center">
                포트폴리오를 삭제하시겠습니까?
              </p>
              <div className="flex justify-around py-[20px]">
                <button
                  className="w-[80px] py-[10px] rounded-lg border-2 border-[#3c5069] hover:bg-[#3c5069] shadow-xl"
                  type="button"
                  onClick={closeConfirm}
                >
                  아니오
                </button>
                <button
                  className="w-[80px] py-[10px] rounded-lg bg-minus hover:scale-110 shadow-xl"
                  type="button"
                  onClick={removeHandler}
                >
                  삭제
                </button>
              </div>
            </Modal>
          )}
          {removeStock && (
            <Modal cssStyle="min-w-[290px]">
              <p className="text-md p-[20px] text-center">
                종목을 삭제하시겠습니까?
              </p>
              <div className="flex justify-around py-[20px]">
                <button
                  className="w-[80px] py-[10px] rounded-lg border-2 border-[#3c5069] hover:bg-[#3c5069] shadow-xl"
                  type="button"
                  onClick={() => setRemoveStock(false)}
                >
                  아니오
                </button>
                <button
                  className="w-[80px] py-[10px] rounded-lg bg-minus hover:scale-110 shadow-xl"
                  type="button"
                  onClick={deleteStock}
                >
                  삭제
                </button>
              </div>
            </Modal>
          )}
          {addView && portfolio && (
            <SearchModal
              portfolio={portfolio}
              setData={setPortfolio}
              closeView={closeView}
            />
          )}
          {updateStock && beforeData && (
            <Modal cssStyle="w-[80%]">
              <div>
                <div className="mb-[15px]">
                  <p className="py-[10px]">수량</p>
                  <input
                    className="w-full rounded-lg p-[15px] bg-primary outline-none"
                    type="number"
                    value={stockCount}
                    onChange={countHandler}
                    placeholder="숫자만 입력해주세요"
                  />
                </div>
                <div className="mb-[15px]">
                  <p className="py-[10px]">평균단가</p>
                  <input
                    className="w-full rounded-lg p-[15px] bg-primary outline-none"
                    type="number"
                    value={updatePrice}
                    onChange={priceHandler}
                    placeholder="숫자만 입력해주세요"
                  />
                </div>
                <button
                  className="bg-primary w-full h-[45px] rounded-lg mt-[20px] hover:bg-plus"
                  type="button"
                  onClick={() =>
                    updatePortfolio(
                      beforeData.stockName,
                      stockCount,
                      updatePrice,
                    )
                  }
                >
                  변경
                </button>
                <button
                  className="bg-primary w-full h-[45px] rounded-lg mt-[20px] hover:bg-minus"
                  type="button"
                  onClick={() => setUpdateStock(false)}
                >
                  취소
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
