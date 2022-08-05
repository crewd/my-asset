import { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import AppLayout from './components/layout/AppLayout';
import MainPage from './pages/MainPage';
import SearchPage from './pages/search/SearchPage';
import FavoritesPage from './pages/favorites/FavoritesPage';
import { stockCodeSearch } from './api';
import { myStockState, stockState } from './recoils/stock';
import { MyStock } from './types/myStock';
import Portfolios from './pages/portfolio/portfolio';
import { stockStore } from './util/stock';
import StockPage from './pages/stock/StockPage';
import PortfolioDetail from './pages/portfolio/portfolioDetail';

const myData: MyStock[] = [
  {
    id: 1,
    name: 'A 포트폴리오',
    holdingStock: [
      {
        stockName: '삼성전자',
        count: 50,
        code: '005930',
        purchasePrice: '90000',
      },
      {
        stockName: 'LG생활건강',
        count: 50,
        code: '051900',
        purchasePrice: '900000',
      },
    ],
  },
  {
    id: 2,
    name: 'B 포트폴리오',
    holdingStock: [
      {
        stockName: '아시아나항공',
        count: 20,
        code: '020560',
        purchasePrice: '20000',
      },
      {
        stockName: '대한항공',
        count: 30,
        code: '003490',
        purchasePrice: '30000',
      },
    ],
  },
];

function App() {
  const setStockData = useSetRecoilState(stockState);
  const setMyStockData = useSetRecoilState(myStockState);

  const portfolioStore = stockStore;

  const myStockCodes: string[] = [];

  if (myData) {
    myData.sort().map((portfolio) => {
      portfolio.holdingStock.map((stock) => myStockCodes.push(stock.code));
      // 나중에 제거 예정
      if (portfolioStore.allStock) {
        portfolioStore.set(portfolio.name, {
          id: portfolio.id,
          name: portfolio.name,
          holdingStock: portfolio.holdingStock,
        });
      }
      return;
    });
  }

  const query = myStockCodes.map((code) => ({
    queryKey: ['code', code],
    queryFn: () => stockCodeSearch(code),
    // onSuccess: (data: Stock) => setStockData([...stockData, data]),
  }));

  const results = useQueries({
    queries: [...query],
  });

  const allSuccess = results.every((num) => num.isSuccess === true);

  useEffect(() => {
    if (allSuccess) {
      results.map((data) =>
        setStockData((stockData) => [...stockData, data.data]),
      );
    }
  }, [allSuccess]);

  useEffect(() => {
    if (!portfolioStore.allStock) {
      return;
    }
    const myStockArray: MyStock[] = [];
    for (let i = 0; i < portfolioStore.allStock.length; i++) {
      const key = portfolioStore.allStock.key(i);
      if (!key || !portfolioStore.get(key)) {
        return;
      }
      myStockArray.push(JSON.parse(portfolioStore.get(key)));
    }
    setMyStockData(
      myStockArray.filter(
        (name, index) => myStockArray.indexOf(name) === index,
      ),
    );
  }, [portfolioStore.allStock]);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/portfolio" element={<Portfolios />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/stock/:srtnCd"
            element={<StockPage srtnCd="005930" />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
