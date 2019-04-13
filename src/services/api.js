import axios from 'axios';

const api = axios.create( {baseURL: 'https://semana-rockseat-backend.herokuapp.com' });

export default api;