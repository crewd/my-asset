import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Box from '../../components/box/Box';
import { Stock } from '../../types/apiType';
import { stockCodeSearch } from '../../api';
import MyResponsiveLine from '../../components/detail/MyResponsiveLine';
import useTitle from '../../hooks/useTitle';
import { LineChartDataType } from '../../types/chart';

const StockPage = () => {
  const { srtnCd } = useParams();
  const { setTitle } = useTitle();
  const { data, status } = useQuery<Stock[]>(['getData', srtnCd], () =>
    stockCodeSearch(srtnCd),
  );
  const [chartData, setChartData] = useState<LineChartDataType[]>();

  const latestDate = Math.max(
    ...(data?.map((e) => Number(e.basDt)) || []),
  ).toString();

  const latestData = data?.filter((date) => date.basDt === latestDate);

  useEffect(() => {
    if (status === 'loading') {
      setTitle('상세');
    }
    if (status === 'success') {
      setTitle(`상세 - ${data[0].itmsNm}`);
      setChartData([
        {
          id: data[0].itmsNm,
          data: data
            .map((e) => ({ x: e.basDt.slice(4), y: e.clpr }))
            .slice(0, 7)
            .reverse(),
        },
      ]);
    }
    if (status === 'error') {
      setTitle('에러');
    }
  }, [status]);

  return (
    <div className="m-auto w-[100%] sm:w-[600px]">
      {latestData &&
        latestData.map((element) => (
          <div key={element.srtnCd}>
            <div className="sm:flex items-end justify-between mb-3 text-right px-2">
              <div className="flex justify-between sm:justify-start">
                <div className="flex items-center sm:mr-2 m-0">
                  <button type="button" className="mr-3 h-[24px]">
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      className="stroke-white stroke-[60px] bg-transparent text-transparent"
                    />
                  </button>
                  <div className="text-left">
                    <span className="text-sm">{element.srtnCd}</span>
                    <h2 className="text-md sm:text-xl font-semibold">
                      {element.itmsNm}
                    </h2>
                  </div>
                </div>
                <div
                  className={`sm:flex items-end ${
                    Number(element.vs) > 0 ? 'text-plus' : 'text-minus'
                  }`}
                >
                  <span className="mx-1 sm:text-md">
                    {Number(element.clpr).toLocaleString()}
                  </span>
                  <span className="mx-1 text-sm">
                    {Number(element.vs) > 0 ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                    {Number(element.vs).toLocaleString()}
                  </span>
                  <span className="mx-1 text-sm">
                    {Number(element.fltRt).toLocaleString()} %
                  </span>
                </div>
              </div>
              <span className="text-sm block mt-[-20px] sm:m-0">
                {element.basDt.replaceAll(
                  /\B(?=(\d{2})+(?!\d))+(?!\d{6})/g,
                  '/',
                )}{' '}
                기준
              </span>
            </div>
            <Box classname="rounded-xl h-[450px] sm:h-[250px] p-[25px] sm:p-[30px] flex flex-col sm:flex-row justify-center sm:items-center leading-8 overflow-hidden mb-7">
              <div className="w-[100%] sm:w-[50%] mr-0 sm:mr-2">
                <p className="flex justify-between">
                  <span>전일</span>
                  <span>
                    {(
                      Number(element.clpr) - Number(element.vs)
                    ).toLocaleString()}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>시가</span>
                  <span>{Number(element.mkp).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>종가</span>
                  <span>{Number(element.clpr).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>상장주식수</span>
                  <span>{Number(element.lstgStCnt).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>시가총액</span>
                  <span>{Number(element.mrktTotAmt).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>구분</span>
                  <span>{element.mrktCtg}</span>
                </p>
              </div>
              <div className="w-[100%] sm:w-[50%] ml-0 sm:ml-2">
                <p className="flex justify-between">
                  <span>고가</span>
                  <span>
                    {(
                      Number(element.hipr) - Number(element.vs)
                    ).toLocaleString()}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>저가</span>
                  <span>{Number(element.lopr).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>전일비</span>
                  <span>{Number(element.vs).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>거래량</span>
                  <span>{Number(element.trqu).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>거래대금</span>
                  <span>{Number(element.trPrc).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span>표준코드</span>
                  <span>{element.isinCd}</span>
                </p>
              </div>
            </Box>
          </div>
        ))}

      <div>
        <h2 className="text-md sm:text-lg mb-3">차트</h2>
        <Box classname="rounded-xl h-[350px] p-[25px] sm:p-[30px] flex overflow-hidden text-white">
          {chartData && <MyResponsiveLine data={chartData} />}
        </Box>
      </div>
    </div>
  );
};

StockPage.defaultProps = {
  srtnCd: '',
};

export default StockPage;
