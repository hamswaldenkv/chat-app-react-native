/* eslint-disable curly */
import {Alert} from 'react-native';
import {userCreate, userLogin} from '../api/userService';
import {ActionConst, Actions} from 'react-native-router-flux';
import {saveKey} from '../util/StorageUtil';

export const setKeyValue = (propKey, propValue) => ({
  type: 'SESSION_SET_VALUE',
  propKey,
  propValue,
});

export const loginAccount =
  (body, params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    dispatch(setKeyValue('loading', true));
    userLogin(body, params)
      .then(result => {
        dispatch(setKeyValue('loading', false));

        let response = result.data;
        console.log('userLogin :', response);

        const {associated_user, error_type, error_message, access_token} =
          response;
        if (access_token) {
          const {
            profile_id,
            id,
            username,
            name,
            first_name,
            last_name,
            email_address,
            photo_url,
          } = associated_user;
          const profileFields = JSON.stringify(associated_user);

          // set session data
          dispatch(setKeyValue('accessToken', access_token));
          dispatch(setKeyValue('profileFields', associated_user));
          dispatch(setKeyValue('accountId', id));
          dispatch(setKeyValue('accountUsername', username));
          dispatch(setKeyValue('accountEmail', email_address));
          dispatch(setKeyValue('profileName', name));
          dispatch(setKeyValue('profileFirstname', first_name));
          if (last_name || last_name !== '')
            dispatch(setKeyValue('profileLastname', last_name));
          if (photo_url || photo_url !== '')
            dispatch(setKeyValue('profilePhoto', photo_url));

          // persist data in storage
          saveKey('accessToken', access_token);
          saveKey('profileFields', profileFields);
          saveKey('accountId', id);
          saveKey('accountUsername', username);
          saveKey('accountEmail', email_address);
          saveKey('profileName', name);
          saveKey('profileFirstname', first_name);
          if (last_name || last_name !== '')
            dispatch(setKeyValue('profileLastname', last_name));

          Actions.home({type: ActionConst.RESET});
        } else if (error_type) {
          Alert.alert('Echec connexion', error_message, [{text: 'Fermer'}]);
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('loading', false));
        console.log('userLogin [err]:', err);

        Alert.alert('Echec connexion', 'Erreur survenue lors de la connexion', [
          {text: 'Fermer'},
        ]);
      });
  };

export const checkEmailRegistration =
  (emailAddress, params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    dispatch(setKeyValue('emailAddress', emailAddress));
    dispatch(setKeyValue('registerStep', 'STEP_PASSWORD'));

    Actions.registerPassword({});
  };

export const registerUser =
  (bodyRequest, params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    dispatch(setKeyValue('loading', true));
    userCreate(bodyRequest, params)
      .then(result => {
        dispatch(setKeyValue('loading', false));

        let response = result.data;
        console.log('userLogin :', response);

        const {associated_user, error_type, error_message, access_token} =
          response;
        if (access_token) {
          const {
            profile_id,
            id,
            username,
            name,
            first_name,
            last_name,
            email_address,
            photo_url,
          } = associated_user;
          const profileFields = JSON.stringify(associated_user);

          // set session data
          dispatch(setKeyValue('accessToken', access_token));
          dispatch(setKeyValue('profileFields', associated_user));
          dispatch(setKeyValue('accountId', id));
          dispatch(setKeyValue('accountUsername', username));
          dispatch(setKeyValue('accountEmail', email_address));
          dispatch(setKeyValue('profileName', name));
          dispatch(setKeyValue('profileFirstname', first_name));
          if (last_name || last_name !== '')
            dispatch(setKeyValue('profileLastname', last_name));
          if (photo_url || photo_url !== '')
            dispatch(setKeyValue('profilePhoto', photo_url));

          // persist data in storage
          saveKey('accessToken', access_token);
          saveKey('profileFields', profileFields);
          saveKey('accountId', id);
          saveKey('accountUsername', username);
          saveKey('accountEmail', email_address);
          saveKey('profileName', name);
          saveKey('profileFirstname', first_name);
          if (last_name || last_name !== '')
            dispatch(setKeyValue('profileLastname', last_name));

          Actions.home({type: ActionConst.RESET});
        } else if (error_type) {
          Alert.alert('Echec connexion', error_message, [{text: 'Fermer'}]);
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('loading', false));
        console.log('userLogin [err]:', err);

        Alert.alert('Echec connexion', 'Erreur survenue lors de la connexion', [
          {text: 'Fermer'},
        ]);
      });
  };
