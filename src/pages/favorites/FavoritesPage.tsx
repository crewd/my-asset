import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/button/Button';
import List from '../../components/box/List';
import useTitle from '../../hooks/useTitle';

function FavoritesPage() {
  useTitle('관심 종목');

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
        <List data={['종목코드', '주식명', '종가', '등락률']} />
        <List data={['005930', '삼성전자dndndn', '1,600,500', '-40.66%']} />
        <List data={['005930', '삼성전자', '60,500 ', '-0.66%']} />
      </div>
      <Button>검색</Button>
    </div>
  );
}

export default FavoritesPage;
