import { faMagnifyingGlass, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getStockData } from '../../api';
import { myStockState } from '../../recoils/stock';
import { Stock } from '../../types/apiType';
import { MyStock } from '../../types/myStock';
import { stockStore } from '../../util/stock';
import Box from '../box/Box';
import List from '../box/List';
import Modal from '../layout/modal';

const SearchModal = ({
  pName,
  pId,
  closeView,
}: {
  pName: string;
  pId: number;
  closeView: () => void;
}) => {
  const store = stockStore;
  const getPortfolio = JSON.parse(store.get(pName));

  const [searchResult, setSearchResult] = useState<Stock[]>([]);
  const [view, setView] = useState(0);

  const [searchStockData, setSearchStockData] = useState<Stock>();
  const [stockCount, setStockCount] = useState<number>();
  const [stockPrice, setStockPrice] = useState<number>();
  const [checked, setChecked] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [myStockData, setMyStockData] = useRecoilState(myStockState);

  const { data, mutate } = useMutation<Stock[]>(
    ['search', searchInputRef],
    () => getStockData(searchInputRef.current.value),
  );

  const searchHandler = (e: React.KeyboardEvent) => {
    if (!searchInputRef.current.value) {
      return;
    }
    if (e.key === 'Enter') {
      mutate();
    }
  };

  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setStockCount(Number(onlyNumber));
  };

  const checkedHandler = () => {
    setChecked(!checked);
  };

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      return setStockPrice(Number(searchStockData.clpr));
    }
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, '');
    return setStockPrice(Number(onlyNumber));
  };

  const prevView = () => {
    setView(0);
  };

  const getData = (thisStock: Stock) => {
    setSearchStockData(thisStock);
  };

  const addItem = () => {
    if (searchStockData && stockCount && stockPrice) {
      store.set(pName, {
        id: pId,
        name: pName,
        holdingStock: [
          ...getPortfolio.holdingStock,
          {
            stockName: searchStockData.itmsNm,
            code: searchStockData.srtnCd,
            count: stockCount,
            purchasePrice: stockPrice.toString(),
          },
        ],
      });

      const newStcokArray: MyStock[] = [];
      const parseStock: MyStock = JSON.parse(store.get(pName));
      parseStock.holdingStock.forEach((element) => {
        myStockData.forEach((stock) => {
          const stockFind = stock.holdingStock.findIndex(
            (hStock) =>
              hStock.stockName === element.stockName &&
              hStock.code === element.code,
          );
          if (stockFind === -1) {
            newStcokArray.push(parseStock);
          }
        });
      });
      setMyStockData(newStcokArray);
    }
  };

  useEffect(() => {
    if (searchStockData && stockCount && stockPrice) {
      closeView();
    }
  }, [myStockData]);

  useEffect(() => {
    if (checked && searchStockData) {
      setStockPrice(Number(searchStockData.clpr));
    }
  }, [checked]);

  useEffect(() => {
    if (data) {
      const latestDate = Math.max(
        ...(data?.map((e) => Number(e.basDt)) || []),
      ).toString();

      setSearchResult(data?.filter((f) => f.basDt === latestDate));
    }
  }, [data]);

  useEffect(() => {
    if (searchStockData) {
      setView(1);
    }
  }, [searchStockData]);

  useEffect(() => {
    if (!view) {
      setSearchStockData(null);
    }
  }, [view]);

  return (
    <Modal cssStyle="w-[80%]">
      {view === 0 && (
        <div className="p-[20px]">
          <div className="flex p-[10px] bg-primary rounded-md w-full">
            <input
              className="bg-primary px-[10px] outline-none w-full"
              type="text"
              placeholder="주식 검색"
              ref={searchInputRef}
              onKeyUp={searchHandler}
            />
            <button className="w-fit px-[5px]" type="button">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </div>
          <Box classname="my-[20px] max-h-[300px] rounded-xl overflow-auto scrollbar-hide">
            <List
              cssStyle="bg-primary border-secondary"
              data={['코드', '주식명', '종가', '등락률']}
            />
            {searchResult ? (
              searchResult.map((stock) => (
                <List
                  key={stock.itmsNm}
                  cssStyle="bg-primary border-secondary"
                  nav={() => getData(stock)}
                  data={[
                    stock.srtnCd,
                    stock.itmsNm,
                    `₩ ${Number(stock.clpr).toLocaleString()}`,
                    `${Number(stock.fltRt).toLocaleString()} %`,
                  ]}
                />
              ))
            ) : (
              <List cssStyle="bg-primary" data={['주식을 검색해주세요!']} />
            )}
          </Box>
          <div>
            <button
              className="mt-[20px] w-full rounded-lg p-[10px] bg-primary"
              type="button"
              onClick={closeView}
            >
              취소
            </button>
          </div>
        </div>
      )}
      {view > 0 && (
        <div className="p-[20px]">
          <div className="mb-[10px]">
            <p className="py-[10px] text-md">주식명</p>
            <div className="w-full rounded-lg p-[15px] bg-primary">
              {searchStockData.itmsNm}
            </div>
          </div>
          <div className="mb-[10px]">
            <p className="py-[10px] text-md">수량</p>
            <input
              className="w-full rounded-lg p-[15px] bg-primary outline-none"
              type="text"
              value={stockCount || ''}
              onChange={countHandler}
              pattern="[0-9]+"
              placeholder="숫자만 입력해주세요"
            />
          </div>
          <div className="mb-[10px]">
            <div className="flex justify-between py-[10px]">
              <p className="text-md">평균 단가</p>
              <button
                className={`${checked && 'text-plus'}`}
                type="button"
                onClick={checkedHandler}
              >
                <FontAwesomeIcon
                  className="mr-[5px]"
                  icon={faCheck}
                  size="sm"
                />
                현재가 적용
              </button>
            </div>
            <input
              className="w-full rounded-lg p-[15px] bg-primary outline-none"
              type="text"
              value={stockPrice || ''}
              onChange={priceHandler}
              pattern="[0-9]+"
              placeholder="숫자만 입력해주세요"
            />
          </div>
          <div>
            <button
              className="bg-primary w-full h-[45px] rounded-lg mt-[20px] hover:bg-[#3c5069]"
              type="button"
              onClick={prevView}
            >
              이전
            </button>
            <button
              className="bg-primary w-full h-[45px] rounded-lg mt-[20px] hover:bg-plus"
              type="button"
              onClick={addItem}
            >
              추가하기
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SearchModal;
