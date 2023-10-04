import {Alert} from 'react-native';
import {eventJoin, eventList} from '../api/userService';
import {Actions} from 'react-native-router-flux';

export const setKeyValue = (propKey, propValue) => ({
  type: 'ENTITIES_SET_VALUE',
  propKey,
  propValue,
});

export const getEvents =
  (params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    dispatch(setKeyValue('loading', true));
    eventList(session.accessToken, params)
      .then(result => {
        dispatch(setKeyValue('loading', false));

        let response = result.data;
        // console.log('eventList :', response);

        const {data} = response;
        if (data) {
          dispatch(setKeyValue('events', data));
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('loading', false));
        console.log('eventList [err]:', err);

        Alert.alert(
          'Echec !',
          'Erreur survenue lors de la récupération de la liste',
          [{text: 'Fermer'}],
        );
      });
  };

export const joinEvent =
  (eventId, bodyRequest, params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    dispatch(setKeyValue('loadingJoin', true));
    eventJoin(session.accessToken, eventId, bodyRequest, params)
      .then(result => {
        dispatch(setKeyValue('loadingJoin', false));

        let response = result.data;
        console.log('eventJoin :', response);

        const {participant} = response;
        if (participant) {
          dispatch(getEvents());
          Alert.alert(
            'Confirmé !',
            'Votre demande a été accepté, vous participez à présent à cet évènement',
            [{text: 'Fermer'}],
          );
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('loadingJoin', false));
        console.log('eventJoin [err]:', err);

        Alert.alert('Echec !', 'Erreur survenue lors de votre demande', [
          {text: 'Fermer'},
        ]);
      });
  };
