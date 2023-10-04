import {Alert} from 'react-native';
import {accountPassword, profileDevices} from '../api/userService';
import {Actions} from 'react-native-router-flux';

export const setKeyValue = (propKey, propValue) => ({
  type: 'SETTING_SET_VALUE',
  propKey,
  propValue,
});

export const updatePassword =
  (bodyRequest, params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    params['access_token'] = session.accessToken;

    dispatch(setKeyValue('loading', true));
    accountPassword(bodyRequest, params)
      .then(result => {
        dispatch(setKeyValue('loading', false));

        let response = result.data;
        console.log('updatePassword :', response);

        const {password_edited, error_type, error_message} = response;
        if (password_edited) {
          Actions.pop();
          Alert.alert('Modifié !', 'Votre mot de passe a été modifié', [
            {text: 'Fermer'},
          ]);
        } else if (error_type) {
          Alert.alert('Echec !', error_message, [{text: 'Fermer'}]);
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('loading', false));
        console.log('updatePassword [err]:', err);

        Alert.alert(
          'Echec !',
          'Erreur survenue lors de la mise à jour de votre mot de passe',
          [{text: 'Fermer'}],
        );
      });
  };

export const updateDeviceToken =
  (bodyRequest, params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    console.log('updateDeviceToken:', bodyRequest);
    profileDevices(session.accessToken, bodyRequest, params)
      .then(result => {
        let response = result.data;
        const {device} = response;

        if (device) {
          console.log('device added/updated', device);
        } else {
          throw new Error('device not added/updated');
        }
      })
      .catch(error => {
        console.log('profileDevices [error]', error);
      });
  };
