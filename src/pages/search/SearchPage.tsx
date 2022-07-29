import List from '../../components/box/List';
import SearchBar from '../../components/search/SearchBar';
import { useRecoilValue } from 'recoil';
import { searchValueState as valueAtom } from '../../recoils/stock';

function SearchPage() {
  const searchValue = useRecoilValue(valueAtom);

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
