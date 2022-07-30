import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { getStockData } from '../../api';
import { searchValueState as valueAtom } from '../../recoils/search';
import { Stock } from '../../types/apiType';

function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchWord, setSearchWord] = useState<string>('');
  const setSearchValue = useSetRecoilState(valueAtom);
  const { data, mutate } = useMutation<Stock[]>(['search', searchWord], () =>
    getStockData(searchWord),
  );
  const dedupArr = [
    ...new Map(data?.map((item) => [item.srtnCd, item])).values(),
  ];

  const searchHandler = () => {
    if (!searchInputRef.current?.value) {
      return;
    }
    setSearchWord(searchInputRef.current.value);
  };

  useEffect(() => {
    if (!searchWord) {
      return;
    }
    mutate();
  }, [searchWord]);

  useEffect(() => {
    if (data) {
      setSearchValue(dedupArr);
    }
  }, [data]);

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
}

export default SearchBar;
