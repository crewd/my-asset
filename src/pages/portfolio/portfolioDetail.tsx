import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myStockState } from '../../recoils/stock';

const PortfolioDetail = () => {
  const myStockData = useRecoilValue(myStockState);
  const { id } = useParams();
  const portfolioData = myStockData.filter((data) => data.id === Number(id));

  return (
    <div>
      <p>포트폴리오 디테일 페이지</p>
    </div>
  );
};

export default PortfolioDetail;
