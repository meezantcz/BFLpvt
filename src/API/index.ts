import Axios from "axios";

const url = "https://dev-bfl-service.writso.com/node/api/bajaj";

const axios = Axios.create({
  baseURL: url,
});

export const onApiCall = async (payload: any) => {
  const response = await axios(payload.url, {
    method: payload.method,
    data: payload.data,
  });

  return response;
};
