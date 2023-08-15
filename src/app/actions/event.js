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

    params.access_token = session.accessToken;

    dispatch(setKeyValue('loading', true));
    eventList(params)
      .then(result => {
        dispatch(setKeyValue('loading', false));

        let response = result.data;
        // console.log('eventList :', response);

        const {events} = response;
        if (events) {
          dispatch(setKeyValue('events', events));
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

    params.access_token = session.accessToken;

    dispatch(setKeyValue('loadingJoin', true));
    eventJoin(eventId, bodyRequest, params)
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
