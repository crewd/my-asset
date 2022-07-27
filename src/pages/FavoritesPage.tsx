import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Box from '../components/box/Box';
import Button from '../components/button/Button';

function FavoritesPage() {
  return (
    <div>
      <h2 className="mb-[32px] text-md font-semibold">
        <FontAwesomeIcon
          icon={faHeart}
          size="lg"
          className="mr-2 text-red-500"
        />
        관심종목
      </h2>
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
      <Button>검색</Button>
    </div>
  );
}

export default FavoritesPage;
