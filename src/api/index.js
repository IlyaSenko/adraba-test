import http from './axios';

export const fetchCoins = () => {
  let qs = `?start=1&limit=100&convert=USD`
  return http.get(`/cryptocurrency/listings/latest` + qs)
}
