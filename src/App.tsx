import { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
} from '@tanstack/react-query';
import AppLayout from './components/layout/AppLayout';
import MainPage from './pages/MainPage';
import SearchPage from './pages/search/SearchPage';
import FavoritesPage from './pages/favorites/FavoritesPage';
import { stockCodeSearch } from './api';

const myData = [
  {
    name: 'a',
    stock: [
      {
        stockName: '삼성전자',
        count: 50,
        price: '90000',
        code: '051900',
        purchasePrice: '30000',
      },
      {
        stockName: 'lg생활건강',
        count: 50,
        price: '760000',
        code: '051900',
        purchasePrice: '30000',
      },
    ],
  },
  {
    name: 'b',
    stock: [
      {
        stockName: '아시아나항공',
        count: 20,
        price: '13000',
        code: '051900',
        purchasePrice: '30000',
      },
      {
        stockName: '대한항공',
        count: 30,
        price: '28000',
        code: '051900',
        purchasePrice: '30000',
      },
    ],
  },
];

function App() {
  const myStockCodes: string[] = [];
  const myStockTotalPrice: number[] = [];

  myData.map((portfolio) =>
    portfolio.stock.map(
      (stock) => (
        myStockCodes.push(stock.code),
        myStockTotalPrice.push(Number(stock.price) * stock.count)
      ),
    ),
  );

  const totalPrice = myStockTotalPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  );

  const query = myStockCodes.map((code) => {
    return { queryKey: ['code', code], queryFn: () => stockCodeSearch(code) };
  });

  const results = useQueries({
    queries: [...query],
  });

  useEffect(() => {
    console.log(results);
  }, [results]);

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
