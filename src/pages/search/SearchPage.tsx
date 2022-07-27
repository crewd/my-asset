import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Box from '../../components/box/Box';
import List from '../../components/box/List';

function SearchPage() {
  return (
    <div>
      <div className="flex mb-[32px] p-[10px] border-b">
        <button className="w-fit">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
        <input
          type="text"
          placeholder="검색"
          className="ml-[10px] w-full bg-transparent focus:outline-none"
        />
      </div>
      <div>
        <List data={['코드', '주식명', '종가', '등락률']} />
        <List data={['005930', '삼성전자dndndn', '1,600,500', '-40.66%']} />
        <List data={['005930', '삼성전자', '60,500 ', '-0.66%']} />
      </div>
    </div>
  );
}

export default SearchPage;
