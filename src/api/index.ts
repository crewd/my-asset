import axios from 'axios';

const baseURL = 'API주소';

export const getData = async (stockName: string) => {
  const data = axios.get(`${baseURL}/요청주소${stockName}`);
  return data;
};
