import { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AppLayout from './components/layout/AppLayout';
import MainPage from './pages/MainPage';
import SearchPage from './pages/search/SearchPage';
import FavoritesPage from './pages/favorites/FavoritesPage';
import { stockCodeSearch } from './api';
import { myStockState, stockState } from './recoils/stock';
import { MyStock } from './types/myStock';
import Portfolio from './pages/portfolio/portfolio';
import { stockStore } from './util/stock';
import StockPage from './pages/stock/StockPage';
import PortfolioDetail from './pages/portfolio/portfolioDetail';

function App() {
  const setStockData = useSetRecoilState(stockState);
  const [myStockData, setMyStockData] = useRecoilState(myStockState);

  const portfolioStore = stockStore;

  const myStockCodes: string[] = [];

  if (myStockData) {
    myStockData.map((portfolio) => {
      portfolio.holdingStock.map((stock) => myStockCodes.push(stock.code));
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
        setStockData((stockData) => [...stockData, data.data[0]]),
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
    setMyStockData(myStockArray);
  }, [portfolioStore.allStock]);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/stock/:srtnCd" element={<StockPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
