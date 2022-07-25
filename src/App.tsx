import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout"
import Box from "./components/layout/box/Box"
import MainPage from "./pages";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" />
          <Route path="/portfolio" />
          <Route path="/portfolio/:id" />
          <Route path="/search" />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
