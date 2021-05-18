import axios from "axios";

const URL = `http://www.filltext.com`;
const TIMEOUT = 10000;

export const createApi = () => {
  return axios.create({
    baseURL: URL,
    timeout: TIMEOUT
  });
};

const api = createApi();

export default api;
