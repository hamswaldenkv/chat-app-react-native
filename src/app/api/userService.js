import axios from 'axios';
import {API_BASE_HOST} from '../config/api';

const ApiContext = axios.create({
  baseURL: API_BASE_HOST,
  withCredentials: false,
  timeout: 30000,
  headers: {'Content-Type': 'text/plain'},
});

ApiContext.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // handle logout
    }
    return Promise.reject(error.response);
  },
);

/**
 * Session
 */

export function sessionInfo(params = {}) {
  return ApiContext.get('session', {params});
}

export function sessionLogin(bodyParams, params = {}) {
  return ApiContext.post('session/logout', bodyParams, {params});
}

export function sessionRefresh(bodyParams, params = {}) {
  return ApiContext.post('session/refresh', bodyParams, {params});
}

/**
 * Accounts
 */

export function userCreate(body, params = {}) {
  return ApiContext.post('auth/register', body, {params});
}

export function userLogin(body, params = {}) {
  return ApiContext.post('auth/login', body, {params});
}

export function accountPassword(body, params = {}) {
  return ApiContext.post('security/password', body, {params});
}

export function assetUpload(body, params = {}) {
  return ApiContext.post('uploads/upload', body, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * Event
 */

export function eventList(params = {}) {
  return ApiContext.get('event/list', {params});
}

export function eventJoin(eventId, body, params = {}) {
  return ApiContext.post(`event/join/${eventId}`, body, {params});
}

/**
 * Profiles
 */
export function profileGet(profileId, params = {}) {
  return ApiContext.get(`profiles/details/${profileId}`, {params});
}

export function profileDevices(body, params = {}) {
  return ApiContext.post('profile/devices', body, {params});
}

/**
 * Chats
 */

export function chatList(params = {}) {
  return ApiContext.get('chat/threads', {params});
}

export function chatCreate(body, params = {}) {
  return ApiContext.post('chat/thread', body, {params});
}

export function messagesList(params = {}) {
  return ApiContext.get('message/filter', {params});
}

export function messageSend(body, params = {}) {
  return ApiContext.post('message/send', body, {params});
}

export function messageDelete(refId, body, params = {}) {
  return ApiContext.post(`message/delete/${refId}`, body, {params});
}
