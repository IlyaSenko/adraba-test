import axios from 'axios';

let http = axios.create({
  headers: { 'X-CMC_PRO_API_KEY': process.env.REACT_APP_API_KEY },
  transformRequest: (data, heads) => {
    const fd = data instanceof FormData
    return fd ? data : JSON.stringify(data || {})
  },
  transformResponse: data => data ? JSON.parse(data) : {}
})

export default http;
