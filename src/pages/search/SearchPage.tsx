import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Box from '../../components/box/Box';

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
        <Box classname="flex justify-between p-[10px] first:rounded-t-xl mb-1.5 text-center text-xxs sm:text-xs font-normal">
          <p className="w-2/12">코드</p>
          <p className="w-2/12">주식명</p>
          <p className="w-2/12">종가</p>
          <p className="w-2/12">전일비</p>
          <p className="w-2/12">등락률</p>
        </Box>
        <Box classname="flex justify-between p-[10px] first:rounded-t-xl mb-1.5 text-center text-xxs sm:text-xs font-normal last:mb-0 ">
          <p className="w-2/12">005930</p>
          <p className="w-2/12">삼성전자dndndn</p>
          <p className="w-2/12">1,600,500 &#8361;</p>
          <p className="w-2/12">-1,150,400 &#8361;</p>
          <p className="w-2/12">-40.66&#37;</p>
        </Box>
        <Box classname="flex justify-between first:rounded-t-xl p-[10px] mb-1.5 text-center text-xxs sm:text-xs font-normal last:mb-0">
          <p className="w-2/12">005930</p>
          <p className="w-2/12">삼성전자</p>
          <p className="w-2/12">60,500 &#8361;</p>
          <p className="w-2/12">-400 &#8361;</p>
          <p className="w-2/12">-0.66&#37;</p>
        </Box>
      </div>
    </div>
  );
}

export default SearchPage;
