import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import Box from '../../components/box/Box';
import { Stock } from '../../types/apiType';
import { stockCodeSearch } from '../../api';
import MyResponsiveLine from '../../components/detail/MyResponsiveLine';

const StockPage = ({ srtnCd }: { srtnCd?: string | number }) => {
  const { data } = useQuery<Stock>(['getData', srtnCd], () =>
    stockCodeSearch(srtnCd),
  );

  return (
    <>
      {data && (
        <div className="m-auto w-[100%] sm:w-[600px]">
          <div>
            <div className="flex items-end justify-between mb-3">
              <div className="flex">
                <div className="flex items-center mr-2">
                  <button type="button" className="mr-3 h-[24px]">
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      className="stroke-white stroke-[60px] bg-transparent text-transparent"
                    />
                  </button>
                  <div>
                    <span className="text-sm">{data.srtnCd}</span>
                    <h2 className="text-md sm:text-xl font-semibold">
                      {data.itmsNm}
                    </h2>
                  </div>
                </div>
                <div
                  className={`flex items-end flex-col md:flex-row ${
                    Number(data.vs) > 0 ? 'text-plus' : 'text-minus'
                  }`}
                >
                  <span className="mx-1 sm:text-md">{data.clpr}</span>
                  <span className="mx-1 text-sm">
                    {Number(data.vs) > 0 ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                    {Number(data.vs).toLocaleString()}
                  </span>
                  <span className="mx-1 text-sm">
                    {Number(data.fltRt).toLocaleString()} %
                  </span>
                </div>
              </div>
              <span className="text-sm">{data.basDt} 기준</span>
            </div>
            <Box classname="rounded-xl h-[450px] sm:h-[250px] p-[25px] sm:p-[30px] flex flex-col sm:flex-row justify-center sm:items-center leading-8 overflow-hidden mb-7">
              <div className="w-[100%] sm:w-[50%] mr-0 sm:mr-2">
                <p className="flex justify-between">
                  <span>전일</span>
                  <span>
                    {(Number(data.clpr) - Number(data.vs)).toLocaleString()}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>시가</span>
                  <span>{Number(data.mkp).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>종가</span>
                  <span>{Number(data.clpr).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>상장주식수</span>
                  <span>{Number(data.lstgStCnt).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>시가총액</span>
                  <span>{Number(data.mrktTotAmt).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>구분</span>
                  <span>{data.mrktCtg}</span>
                </p>
              </div>
              <div className="w-[100%] sm:w-[50%] ml-0 sm:ml-2">
                <p className="flex justify-between">
                  <span>고가</span>
                  <span>
                    {(Number(data.hipr) - Number(data.vs)).toLocaleString()}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>저가</span>
                  <span>{Number(data.lopr).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>전일비</span>
                  <span>{Number(data.vs).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>거래량</span>
                  <span>{Number(data.trqu).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>거래대금</span>
                  <span>{Number(data.trPrc).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>표준코드</span>
                  <span>{data.isinCd}</span>
                </p>
              </div>
            </Box>
          </div>
          <div>
            <h2 className="text-md sm:text-lg mb-3">차트</h2>
            <Box classname="rounded-xl h-[250px] p-[25px] sm:p-[30px] flex overflow-hidden text-white">
              <MyResponsiveLine />
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

StockPage.defaultProps = {
  srtnCd: '005930',
};

export default StockPage;
