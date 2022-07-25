import Box from "../components/layout/box/Box";

const MainPage = () => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-[10px]">
        <Box classname="w-[100%] h-[300px] rounded-xl">
          총 자산
        </Box>
        <div className="grid grid-cols-2 gap-[10px]">
          <Box classname="w-[100%] h-[150px] rounded-xl col-span-2">
            포트폴리오 바로가기
          </Box>
          <Box classname="w-[100%] h-[135px] rounded-xl">
            관심종목
          </Box>
          <Box classname="w-[100%] h-[135px] rounded-xl">
            종목 검색
          </Box>
        </div>
      </div>
      <div className="my-[40px]">
        <p className="p-[5px] text-center">거래량 TOP 10</p>
        <div className="mt-[15px]">
          <Box classname="p-[15px] rounded-t-xl border-b-2 border-primary">first</Box>
          <Box classname="p-[15px] border-b-2 border-primary">2</Box>
          <Box classname="p-[15px] rounded-b-xl">last</Box>
        </div>
      </div>
    </div>
  )
}

export default MainPage;