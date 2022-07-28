import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getStockData } from '../../api';
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Stock } from '../../types/apiType';
import List from '../../components/box/List';

function SearchPage() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const { data, mutate } = useMutation<Stock[]>(['search', searchValue], () =>
    getStockData(searchValue),
  );
  const dedupArr = [
    ...new Map(data?.map((item) => [item.srtnCd, item])).values(),
  ];

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    mutate();
  }, [searchValue]);

  const searchHandler = () => {
    if (!searchInputRef.current?.value) {
      return;
    }
    setSearchValue(searchInputRef.current.value);
  };

  const searchEnterKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };
  return (
    <div>
      <div className="flex mb-[32px] p-[10px] border-b">
        <button className="w-fit" onClick={searchHandler}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="검색"
          onKeyUp={searchEnterKeyHandler}
          className="ml-[10px] w-full bg-transparent focus:outline-none"
        />
      </div>
      <div>
        <List data={['코드', '주식명', '종가', '등락률']} />
        {dedupArr &&
          dedupArr.map((e, index) => {
            return (
              <List
                key={index}
                data={[
                  e.srtnCd,
                  e.itmsNm,
                  '₩ ' + Number(e.clpr).toLocaleString(),
                  Number(e.fltRt).toLocaleString() + ' %',
                ]}
              />
            );
          })}
      </div>
    </div>
  );
}

export default SearchPage;
