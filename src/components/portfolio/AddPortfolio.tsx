import React, { useEffect, useRef } from 'react';
import { stockStore } from '../../util/stock';
import { ModalPortal } from '../layout/modal';

const AddPortfolio = ({ cancel }: { cancel: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const store = stockStore;

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalPortal>
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:content-none">
        <div className="absolute top-[50%] left-[50%] p-[20px] w-[80%] translate-x-[-50%] translate-y-[-50%] max-w-[600px] bg-secondary rounded-xl">
          <div className="my-[20px]">
            <p className="pb-[10px] text-md">포트폴리오 이름</p>
            <input
              className="w-full bg-primary outline-none p-[10px] rounded-md"
              type="text"
              maxLength={10}
              placeholder="10자 이하"
              ref={inputRef}
              onChange={() => console.log(inputRef.current?.value)}
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              className="bg-secondray w-[100px] h-[50px] mx-[10px] rounded-md border-2 border-primary hover:bg-primary shadow-xl"
              type="button"
              onClick={cancel}
            >
              닫기
            </button>
            <button
              className="bg-secondray w-[100px] h-[50px] mx-[10px] rounded-md border-2 border-primary hover:bg-primary shadow-xl"
              type="button"
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default AddPortfolio;
