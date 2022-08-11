import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '../../components/box/List';
import SearchBar from '../../components/search/SearchBar';
import useTitle from '../../hooks/useTitle';
import { Stock } from '../../types/apiType';

const SearchPage: React.FC = () => {
  useTitle('종목검색');
  const [searchValue, setSearchValue] = useState<Stock[]>([]);
  const { search } = useLocation();
  const searchWord = decodeURI(search.slice(7));
  const navigate = useNavigate();

  return (
    <div>
      <SearchBar searchWord={searchWord} getData={setSearchValue} />
      <div>
        <List
          cssStyle="bg-secondary border-primary"
          data={['코드', '주식명', '종가', '등락률']}
        />
        {!searchValue ? null : searchValue && searchValue.length > 0 ? (
          searchValue.map((e) => (
            <List
              key={e.itmsNm}
              nav={() => navigate(`/stock/${e.srtnCd}`)}
              cssStyle="bg-secondary border-primary"
              data={[
                e.srtnCd,
                e.itmsNm,
                `₩ ${Number(e.clpr).toLocaleString()}`,
                `${Number(e.fltRt).toLocaleString()} %`,
              ]}
            />
          ))
        ) : (
          <List
            cssStyle="bg-secondary border-primary"
            data={['검색결과가 없습니다.']}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
