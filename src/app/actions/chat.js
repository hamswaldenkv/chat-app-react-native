import {Alert} from 'react-native';
import {
  chatCreate,
  chatList,
  messageSend,
  messagesList,
} from '../api/userService';
import {Actions} from 'react-native-router-flux';
import EventsManager from '../util/EventUtil';

export const setKeyValue = (propKey, propValue) => ({
  type: 'ENTITIES_SET_VALUE',
  propKey,
  propValue,
});

export const getChats =
  (params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    params.access_token = session.accessToken;

    dispatch(setKeyValue('loadingCreate', true));
    chatList(session.accessToken, params)
      .then(result => {
        dispatch(setKeyValue('loadingCreate', false));

        let response = result.data;
        // console.log('chatList :', response);

        const {data, error_type, error_message} = response;
        if (data) {
          dispatch(setKeyValue('chats', data));
        } else if (error_type) {
          Alert.alert('Echec !', error_message, [{text: 'Fermer'}]);
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('loadingCreate', false));
        console.log('chatList [err]:', err);

        Alert.alert(
          'Echec !',
          'Erreur survenue lors de la récupération des chats',
          [{text: 'Fermer'}],
        );
      });
  };

export const getMessages =
  (params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session, entities} = state;

    console.log({params});

    dispatch(setKeyValue('messageLoading', true));
    messagesList(session.accessToken, params)
      .then(result => {
        dispatch(setKeyValue('messageLoading', false));

        let response = result.data;
        // console.log('messagesList :', response);

        const {messages, error_type, error_message} = response;
        if (messages) {
          const {thread_id} = params;
          let lastMessageId = `ls-${new Date().getTime()}`;
          let messagesByThread = {...entities.messagesByThread};
          messagesByThread[thread_id] = messages;
          dispatch(setKeyValue('messagesByThread', messagesByThread));
          setTimeout(() => {
            dispatch(setKeyValue('lastMessageId', lastMessageId));
          }, 300);
        } else if (error_type) {
          Alert.alert('Echec !', error_message, [{text: 'Fermer'}]);
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('messageLoading', false));
        console.log('messagesList [err]:', err.message);

        Alert.alert('Echec !', 'Impossible de récupérer les messages', [
          {text: 'Fermer'},
        ]);
      });
  };

export const createChat =
  (bodyRequest, params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    dispatch(setKeyValue('loadingCreate', true));
    chatCreate(session.accessToken, bodyRequest, params)
      .then(result => {
        dispatch(setKeyValue('loadingCreate', false));

        let response = result.data;
        console.log('chatCreate :', response);

        const {chat_thread, error_type, error_message} = response;
        if (chat_thread) {
          dispatch(getChats());
          EventsManager.getInstance()._emit('onThreadCreated', chat_thread.id);
        } else if (error_type) {
          Alert.alert('Echec !', error_message, [{text: 'Fermer'}]);
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('loadingCreate', false));
        console.log('chatCreate [err]:', err);

        Alert.alert('Echec !', 'Erreur survenue lors de la création du chat', [
          {text: 'Fermer'},
        ]);
      });
  };

export const sendMessage =
  (bodyRequest, params = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const {session} = state;

    dispatch(setKeyValue('messageSending', true));
    messageSend(session.accessToken, bodyRequest, params)
      .then(result => {
        dispatch(setKeyValue('messageSending', false));

        let response = result.data;

        const {message} = response;
        if (message) {
          dispatch(getChats());
          dispatch(getMessages({thread_id: message.chat_thread_id}));
          console.log('message sent', message);
        } else {
          throw new Error('message not sent');
        }
      })
      .catch(error => {
        console.log('messageSend [error]', error);
        dispatch(setKeyValue('messageSending', false));
      });
  };
