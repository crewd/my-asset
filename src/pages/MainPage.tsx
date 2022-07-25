import Box from "../components/layout/box/Box";

const MainPage = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-[10px]">
        <Box classname="md:w-[calc(100%-10px)] h-[300px]">
          총 자산
        </Box>
        <div className="grid grid-cols-2 gap-[10px]">
          <Box classname="md:w-[calc(100%-10px)] h-[150px] col-span-2">
            포트폴리오 바로가기
          </Box>
          <Box classname="md:w-[calc(100%-10px)] h-[135px]">
            관심종목
          </Box>
          <Box classname="md:w-[calc(100%-10px)] h-[135px]">
            종목 검색
          </Box>
        </div>
      </div>
      <div className="mt-[40px]">
        <p className="p-[5px] text-center">거래량 TOP 10</p>
        <div className="mt-[15px]">
          <Box classname="p-[15px] rounded-none rounded-t-lg border-b-2 border-primary">first</Box>
          <Box classname="p-[15px] rounded-none border-b-2 border-primary">2</Box>
          <Box classname="p-[15px] rounded-none rounded-b-lg">last</Box>
        </div>
      </div>
    </div>
  )
}

export default MainPage;