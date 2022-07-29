import List from '../../components/box/List';
import SearchBar from '../../components/search/SearchBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchValueState as valueAtom } from '../../recoils/search';
import { useEffect } from 'react';

function SearchPage() {
  const [searchValue, setSearchValue] = useRecoilState(valueAtom);
  useEffect(() => {
    setSearchValue(null);
  }, []);

  return (
    <div>
      <SearchBar />
      <div>
        <List data={['코드', '주식명', '종가', '등락률']} />
        {searchValue &&
          searchValue.map((e, index) => {
            return (
              <List
                key={index}
                data={[
                  e.srtnCd,
                  e.itmsNm,
                  `₩ ${Number(e.clpr).toLocaleString()}`,
                  `${Number(e.fltRt).toLocaleString()}  %`,
                ]}
              />
            );
          })}
      </div>
    </div>
  );
}

export default SearchPage;
