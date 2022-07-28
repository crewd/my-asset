import axios from 'axios';

const baseURL =
  'https://api.odcloud.kr/api/GetStockSecuritiesInfoService/v1/getStockPriceInfo?resultType=json';

const serviceKey = `gIgWSDzCeTDpTHNna3UfLVrfBmHbLPDu8IRh%2FvJuoHy5Sp1OFCc9r6uWHIqcEpCF8pWmul9zZMDQLafiKcrx3Q%3D%3D`;

export const getStockData = async (stockName: string) => {
  const data = await axios.get(
    `${baseURL}&likeItmsNm=${stockName}&serviceKey=${serviceKey}`,
  );

  return data.data.response.body.items.item;
};

export const stockCodeSearch = async (code: number | string) => {
  const data = await axios.get(
    `${baseURL}&likeSrtnCd=${code}&serviceKey=${serviceKey}`,
  );

  return data.data.response.body.items.item[0];
};
