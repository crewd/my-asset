import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-auto">
      <header className="h-[60px] leading-[60px] border-b-2 border-secondary">
        <nav className="w-[1400px] m-auto flex justify-between">
          <h2 className="text-xl w-[10%] m-0">마이에셋</h2>
          <ul className="flex justify-around">
            <li className="mx-[10px]">종목 검색</li>
            <li className="mx-[10px]">관심 종목</li>
            <li className="mx-[10px]">포트폴리오</li>
          </ul>
        </nav>
      </header>
      <main className="w-[1024px] m-auto pt-[30px]">
        {children}
      </main>
    </div>
  )
}

export default AppLayout;