import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout"
import Box from "./components/layout/box/Box"

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Box classname="w-[500px] h-[500px]">마이에셋</Box>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
