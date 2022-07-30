import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = useState(false);

  const menuToggle = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="m-auto">
      <header className="sm:h-[60px] leading-[60px] border-b-2 border-secondary">
        <nav className="max-w-[1400px] m-auto w-[100%] flex justify-between sm:flex-row flex-col items-start">
          <Link className="px-[20px]" to="/">
            <h2 className="text-xl">마이에셋</h2>
          </Link>
          <div
            className={`sm:hidden ${
              !isOpened ? 'top-[5px]' : 'top-0'
            } absolute right-[20px]`}
            onClick={menuToggle}
            onKeyDown={menuToggle}
            role="presentation"
          >
            {isOpened ? (
              <FontAwesomeIcon icon={faX} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="2x" />
            )}
          </div>
          <ul
            className={`sm:flex ${
              isOpened ? 'flex' : 'hidden'
            } sm:flex-row text-center flex-col sm:justify-end items-center w-[100%] sm:w-fit`}
          >
            <li className="mx-[10px] px-[10px] sm:w-auto w-[100%]">
              <Link to="/search">종목 검색</Link>
            </li>
            <li className="mx-[10px] px-[10px] sm:w-auto w-[100%]">
              <Link to="/favorites">관심종목</Link>
            </li>
            <li className="mx-[10px] px-[10px] sm:w-auto w-[100%]">
              <Link to="/portfolio">포트폴리오</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="max-w-[1024px] w-[100%] m-auto pt-[40px] lg:px-0 px-[20px]">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
