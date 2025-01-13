const axios = require('axios');

const makeGETRequest = (url, params = {}) => {
  return axios.get(url, { params })
    .then(response => response.data)
    .catch(error => {
      console.error('Ошибка при запросе:', error);
      throw error;
    });
};
const makePOSTRequest = (url, data = {}) => {
  return axios.post(url, data)
    .then(response => response.data)
    .catch(error => {
      console.error('Ошибка при запросе:', error);
      throw error;
    });
};



module.exports = {
    makeGETRequest,
    makePOSTRequest,
  };