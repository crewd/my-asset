import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getStockData } from '../../api';
import { Stock } from '../../types/apiType';
import Box from '../box/Box';
import List from '../box/List';
import Modal from '../layout/modal';

const SearchModal = () => {
  const [searchResult, setSearchResult] = useState<Stock[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (data) {
      const latestDate = Math.max(
        ...(data?.map((e) => Number(e.basDt)) || []),
      ).toString();

      setSearchResult(data?.filter((f) => f.basDt === latestDate));
    }
  }, [data]);

  return (
    <Modal cssStyle="w-[80%]">
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
      </div>
    </Modal>
  );
};

export default SearchModal;
