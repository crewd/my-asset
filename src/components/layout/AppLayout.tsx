import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpened, setIsOpened] = useState(false);

  const menuToggle = () => {
    setIsOpened(!isOpened);
  }

  return (
    <div className="m-auto">
      <header className="sm:h-[60px] leading-[60px] border-b-2 border-secondary">
        <nav className="max-w-[1400px] m-auto w-[100%] flex justify-between sm:flex-row flex-col items-start">
          <h2 className="text-xl w-[90%] px-[20px]">마이에셋</h2>
          <div className="sm:hidden absolute top-[5px] right-[20px]" onClick={menuToggle} >
            {isOpened ? <FontAwesomeIcon icon={faX} size="2x" /> : <FontAwesomeIcon icon={faBars} size="2x" />}
          </div>
          <ul className={`sm:flex ${isOpened ? "flex" : "hidden"} sm:flex-row text-center flex-col sm:justify-end items-center w-[100%]`}>
            <li className="mx-[10px] px-[10px] sm:w-auto w-[100%]">종목 검색</li>
            <li className="mx-[10px] px-[10px] sm:w-auto w-[100%]">관심 종목</li>
            <li className="mx-[10px] px-[10px] sm:w-auto w-[100%]">포트폴리오</li>
          </ul>
        </nav>
      </header>
      <div className="max-w-[1024px] w-[100%] m-auto pt-[40px] lg:px-0 px-[20px]">
        {children}
      </div>
    </div>
  )
}

export default AppLayout;