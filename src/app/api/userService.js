import axios from 'axios';
import {API_BASE_HOST} from '../config/api';

const ApiContext = axios.create({
  baseURL: API_BASE_HOST,
  withCredentials: false,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
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
  return ApiContext.post('auth/signup', body, {params});
}

export function userLogin(body, params = {}) {
  return ApiContext.post('auth/login', body, {params});
}

export function accountPassword(body, params = {}) {
  return ApiContext.post('security/password', body, {params});
}

export function assetUpload(body, params = {}) {
  return ApiContext.post('uploads', body, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * Event
 */

export function eventList(accessToken, params = {}) {
  return ApiContext.get('events', {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function eventJoin(accessToken, eventId, body, params = {}) {
  return ApiContext.post(`events/${eventId}/participants`, body, {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

/**
 * Profiles
 */
export function profileGet(profileId, params = {}) {
  return ApiContext.get(`profiles/${profileId}`, {params});
}

export function profileDevices(accessToken, body, params = {}) {
  return ApiContext.post('devices', body, {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

/**
 * Chats
 */

export function chatList(accessToken, params = {}) {
  return ApiContext.get('chats', {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function chatCreate(accessToken, body, params = {}) {
  return ApiContext.post('chats', body, {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function messagesList(accessToken, params = {}) {
  return ApiContext.get('messages', {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function messageSend(accessToken, body, params = {}) {
  return ApiContext.post('messages', body, {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function messageDelete(refId, body, params = {}) {
  return ApiContext.post(`messages/${refId}`, body, {params});
}
