export const API_BASE_PROD = 'https://creators.ekonzostream.com/api/chat';
export const API_BASE_DEV = 'http://192.168.100.12:8000';

const API_ENV = 'live';
export const API_BASE_HOST = API_ENV === 'dev' ? API_BASE_DEV : API_BASE_PROD;
