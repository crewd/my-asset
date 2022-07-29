import { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import AppLayout from './components/layout/AppLayout';
import MainPage from './pages/MainPage';
import SearchPage from './pages/search/SearchPage';
import FavoritesPage from './pages/favorites/FavoritesPage';
import { stockCodeSearch } from './api';
import { useRecoilState } from 'recoil';
import { myStockState, stockState } from './recoils/stock';
import { Stock } from './types/apiType';

const myData = [
  {
    name: 'a',
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
    name: 'b',
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
  const [stockData, setStockData] = useRecoilState(stockState);
  const [myStockData, setMyStockData] = useRecoilState(myStockState);

  const myStockCodes: string[] = [];

  myData.map((portfolio) =>
    portfolio.holdingStock.map((stock) => myStockCodes.push(stock.code)),
  );

  const query = myStockCodes.map((code) => {
    return {
      queryKey: ['code', code],
      queryFn: () => stockCodeSearch(code),
      // onSuccess: (data: Stock) => setStockData([...stockData, data]),
    };
  });

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
    if (!myData) {
      return;
    }
    setMyStockData(myData);
  }, []);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/portfolio" />
          <Route path="/portfolio/:id" />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
