import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const SOCKET_IO_URL = process.env.REACT_APP_BASE_URL;

export const PARCEL_URL = '/parcels';

export const UNSTOCK_URL = '/parcels/unstock';

export const SEARCH_URL = '/search/';

export const LOGIN_URL = '/user/login';

export const STORAGES_URL = '/storages';

export default API;
