import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import List from '../../components/box/List';
import useTitle from '../../hooks/useTitle';
import { stockCodeSearch } from '../../api';
import { Stock } from '../../types/apiType';
import { favStockStore } from '../../util/favoriteStock';

function FavoritesPage() {
  useTitle('관심 종목');
  const nav = useNavigate();
  const store = favStockStore;
  const [myStockCodes, setMycodes] = useState<string[]>([]);
  const [stockApiData, setStockApiData] = useState<Stock[]>([]);

  const query = myStockCodes.map((code) => ({
    queryKey: ['favoriteStockCode', code],
    queryFn: () => stockCodeSearch(code),
  }));

  const results = useQueries({
    queries: [...query],
  });

  const allSuccess = results.every((num) => num.isSuccess === true);

  useEffect(() => {
    if (allSuccess) {
      results.map((data) =>
        setStockApiData((sData) => [...sData, data.data[0]]),
      );
    }
  }, [allSuccess]);

  useEffect(() => {
    setMycodes(store.get());
  }, [store]);

  return (
    <div>
      <h2 className="mb-[32px] text-xl font-semibold">
        <FontAwesomeIcon
          icon={faHeart}
          size="lg"
          className="mr-2 text-red-500"
        />
        관심종목
      </h2>
      <div>
        <List
          cssStyle="bg-secondary border-primary"
          data={['종목코드', '주식명', '종가', '등락률']}
        />
        {store.get().length > 0 ? (
          stockApiData.map((e) => (
            <List
              key={e.srtnCd}
              cssStyle="bg-secondary border-primary"
              data={[
                e.srtnCd,
                e.itmsNm,
                `₩ ${Number(e.clpr).toLocaleString()}`,
                `${Number(e.fltRt).toLocaleString()} %`,
              ]}
              nav={() => nav(`/stock/${e.srtnCd}`)}
            />
          ))
        ) : (
          <List
            cssStyle="bg-secondary border-primary"
            data={['관심종목이 없습니다.']}
          />
        )}
      </div>
      <Button clickEvent={() => nav('/search')}>검색</Button>
    </div>
  );
}

export default FavoritesPage;
