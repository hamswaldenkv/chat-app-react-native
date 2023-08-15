/* eslint-disable curly */
import {Alert} from 'react-native';
import {userCreate, userLogin} from '../api/userService';
import {ActionConst, Actions} from 'react-native-router-flux';
import {getKey, removeKey, saveKey} from '../util/StorageUtil';

export const setKeyValue = (propKey, propValue) => ({
  type: 'SESSION_SET_VALUE',
  propKey,
  propValue,
});

export const logout = () => ({type: 'LOGOUT'});

export const checkSession = () => (dispatch, getState) => {
  const state = getState();
  const {session} = state;

  getKey('profileFields').then(result => {
    if (result) dispatch(setKeyValue('profileFields', JSON.parse(result)));
  });

  getKey('accountId').then(result => {
    if (result) dispatch(setKeyValue('accountId', result));
  });

  getKey('accountUsername').then(result => {
    if (result) dispatch(setKeyValue('accountUsername', result));
  });

  getKey('accountEmail').then(result => {
    if (result) dispatch(setKeyValue('accountEmail', result));
  });

  getKey('profileId').then(result => {
    if (result) dispatch(setKeyValue('profileId', result));
  });

  getKey('profileName').then(result => {
    if (result) dispatch(setKeyValue('profileName', result));
  });

  getKey('profilePhoto').then(result => {
    if (result) dispatch(setKeyValue('profilePhoto', result));
  });

  getKey('accessToken')
    .then(accessToken => {
      if (accessToken) {
        dispatch(setKeyValue('accessToken', accessToken));
        Actions.home({type: ActionConst.RESET});
      } else {
        throw new Error('no valid accessToken');
      }
    })
    .catch(err => {
      console.log('accessToken [err]', err);
      Actions.login({type: ActionConst.RESET});
    });
};

export const destroySession = () => (dispatch, getState) => {
  const state = getState();
  const {session} = state;

  removeKey('accessToken').then(() => {
    Actions.login({type: ActionConst.RESET});
  });

  removeKey('profileFields').then(() => {});
  removeKey('accountId').then(() => {});
  removeKey('accountUsername').then(() => {});
  removeKey('accountEmail').then(() => {});
  removeKey('profileId').then(() => {});
  removeKey('profileName').then(() => {});
  removeKey('profilePhoto').then(() => {});

  dispatch(logout());
};
