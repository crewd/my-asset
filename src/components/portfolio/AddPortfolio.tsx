import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { myStockState } from '../../recoils/stock';
import { stockStore } from '../../util/stock';
import Modal from '../layout/modal';

const AddPortfolio = ({ cancel }: { cancel: () => void }) => {
  const [inputValue, setInputValue] = useState('');
  const store = stockStore;

  const [myStockData, setMyStockData] = useRecoilState(myStockState);

  const onChangeHandler = (e: React.SyntheticEvent) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  const addHandler = () => {
    if (!inputValue) {
      return;
    }
    stockStore.set(inputValue, {
      id: store.allStock.length,
      name: inputValue,
      holdingStock: [],
    });
    setMyStockData((data) => [...data, JSON.parse(store.get(inputValue))]);
  };

  useEffect(() => {
    if (myStockData && inputValue) {
      cancel();
    }
  }, [myStockData]);

  return (
    <Modal cssStyle="w-[80%]">
      <div className="my-[20px]">
        <p className="pb-[10px] text-md">포트폴리오 이름</p>
        <input
          className="w-full bg-primary outline-none p-[10px] rounded-md"
          type="text"
          maxLength={10}
          placeholder="10자 이하"
          onChange={onChangeHandler}
        />
      </div>
      <div className="w-full flex justify-center">
        <button
          className="bg-secondray w-[100px] h-[50px] mx-[10px] rounded-md border-2 border-[#3c5069] hover:bg-[#3c5069] shadow-xl"
          type="button"
          onClick={cancel}
        >
          닫기
        </button>
        <button
          className="bg-secondray w-[100px] h-[50px] mx-[10px] rounded-md border-2 border-[#3c5069] hover:bg-plus shadow-xl"
          type="button"
          onClick={addHandler}
        >
          추가
        </button>
      </div>
    </Modal>
  );
};

export default AddPortfolio;
