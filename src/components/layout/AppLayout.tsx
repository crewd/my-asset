import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = useState(false);

  const navigate = useNavigate();

  const navigateHandler = (path: string) => {
    navigate(`/${path}`);
  };

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
          <div
            className={`sm:flex ${
              isOpened ? 'flex' : 'hidden'
            } sm:flex-row text-center flex-col sm:justify-end items-center w-[100%] sm:w-fit`}
          >
            <button
              className="mx-[10px] px-[10px] sm:w-auto w-[100%] sm:hover:bg-inherit hover:bg-secondary"
              type="button"
              onClick={() => navigateHandler('search')}
            >
              종목 검색
            </button>
            <button
              className="mx-[10px] px-[10px] sm:w-auto w-[100%] sm:hover:bg-inherit hover:bg-secondary"
              type="button"
              onClick={() => navigateHandler('favorites')}
            >
              관심종목
            </button>
            <button
              className="mx-[10px] px-[10px] sm:w-auto w-[100%] sm:hover:bg-inherit hover:bg-secondary"
              type="button"
              onClick={() => navigateHandler('portfolio')}
            >
              포트폴리오
            </button>
          </div>
        </nav>
      </header>
      <div className="max-w-[1024px] w-[100%] m-auto pt-[40px] lg:px-0 px-[20px]">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
