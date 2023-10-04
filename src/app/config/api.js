export const API_BASE_PROD = 'https://creators.ekonzostream.com/api/chat';
export const API_BASE_DEV = 'http://192.168.11.101:8000/api/v1';

const API_ENV = 'dev';
export const API_BASE_HOST = API_ENV === 'dev' ? API_BASE_DEV : API_BASE_PROD;
