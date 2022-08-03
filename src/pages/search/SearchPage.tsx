import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import List from '../../components/box/List';
import SearchBar from '../../components/search/SearchBar';
import { searchValueState as valueAtom } from '../../recoils/search';

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useRecoilState(valueAtom);

  useEffect(() => {
    setSearchValue(undefined);
  }, []);

  return (
    <div>
      <SearchBar />
      <div>
        <List data={['코드', '주식명', '종가', '등락률']} />
        {!searchValue ? null : searchValue && searchValue.length > 0 ? (
          searchValue.map((e) => (
            <List
              key={e.itmsNm}
              data={[
                e.srtnCd,
                e.itmsNm,
                `₩ ${Number(e.clpr).toLocaleString()}`,
                `${Number(e.fltRt).toLocaleString()} %`,
              ]}
            />
          ))
        ) : (
          <List data={['검색결과가 없습니다.']} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
