import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getStockData } from '../../api';
import { Stock } from '../../types/apiType';

const SearchBar = ({
  searchWord,
  getData,
}: {
  searchWord: string;
  getData: Dispatch<SetStateAction<Stock[]>>;
}) => {
  const nav = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data, mutate } = useMutation<Stock[]>(['search', searchWord], () =>
    getStockData(searchWord),
  );

  // 최근 업데이트 날짜 찾기
  const latestDate = Math.max(
    ...(data?.map((e) => Number(e.basDt)) || []),
  ).toString();

  const searchValue = data?.filter((f) => f.basDt === latestDate);

  useEffect(() => {
    if (!searchWord) {
      return;
    }
    searchInputRef.current.value = searchWord;
    mutate();
  }, [searchWord]);

  useEffect(() => {
    getData(searchValue);
  }, [data]);

  const searchHandler = () => {
    // 검색어가 없거나 검색어와 쿼리스트링이 같을경우 리턴
    if (!searchInputRef.current?.value) {
      return;
    }
    nav({ search: `query=${searchInputRef.current.value}` });
  };

  const searchEnterKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
    <div className="flex mb-[32px] p-[10px] border-b">
      <button className="w-fit" type="button" onClick={searchHandler}>
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
  );
};

export default SearchBar;
