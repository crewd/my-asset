import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStockData } from '../../api';
import { searchValueState as valueAtom } from '../../recoils/search';
import { Stock } from '../../types/apiType';

function SearchBar() {
  const nav = useNavigate();
  const { search } = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const setSearchValue = useSetRecoilState(valueAtom);
  const { data, mutate } = useMutation<Stock[]>(['search', search], () =>
    getStockData(search.slice(7)),
  );

  // 날짜 오름차순 정렬
  const compareDate = (a: Stock, b: Stock) => {
    if (a.basDt < b.basDt) {
      return -1;
    }
    if (a.basDt > b.basDt) {
      return 1;
    }
    return 0;
  };

  const dedupArr = [
    ...new Map(
      data?.sort(compareDate).map((item) => [item.isinCd, item]),
    ).values(),
  ];

  useEffect(() => {
    if (search.length < 8 || search.slice(0, 7) !== '?query=') {
      nav('/search');
      return;
    }
    if (searchInputRef.current != null) {
      searchInputRef.current.value = decodeURI(search.slice(7));
    }

    mutate();
  }, [search]);

  useEffect(() => {
    if (data) {
      setSearchValue(dedupArr);
    }
  }, [data]);

  const searchHandler = () => {
    // 검색어가 없거나 검색어와 쿼리스트링이 같을경우 리턴
    if (
      !searchInputRef.current?.value ||
      encodeURI(searchInputRef.current.value) === search.slice(7)
    ) {
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
}

export default SearchBar;
