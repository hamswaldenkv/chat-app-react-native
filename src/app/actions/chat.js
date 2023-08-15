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
    chatList(params)
      .then(result => {
        dispatch(setKeyValue('loadingCreate', false));

        let response = result.data;
        console.log('chatList :', response);

        const {chat_threads, error_type, error_message} = response;
        if (chat_threads) {
          dispatch(setKeyValue('chats', chat_threads));
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

    params.access_token = session.accessToken;

    dispatch(setKeyValue('messageLoading', true));
    messagesList(params)
      .then(result => {
        dispatch(setKeyValue('messageLoading', false));

        let response = result.data;
        console.log('messagesList :', response);

        const {messages, error_type, error_message} = response;
        if (messages) {
          const {thread_id} = params;
          let messagesByThread = {...entities.messagesByThread};
          messagesByThread[thread_id] = messages;
          dispatch(setKeyValue('messagesByThread', messagesByThread));

          if (Array.from(messages).length > 0) {
            const lastIndex = Array.from(messages).length - 1;
            const lastMessage = messages.find((_, x) => x === lastIndex);
            dispatch(setKeyValue('lastMessageId', lastMessage.id));
          }
        } else if (error_type) {
          Alert.alert('Echec !', error_message, [{text: 'Fermer'}]);
        } else {
          throw new Error('error occured');
        }
      })
      .catch(err => {
        dispatch(setKeyValue('messageLoading', false));
        console.log('messagesList [err]:', err);

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

    params.access_token = session.accessToken;

    dispatch(setKeyValue('loadingCreate', true));
    chatCreate(bodyRequest, params)
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

    console.log('updateDeviceToken:', bodyRequest);

    params.access_token = session.accessToken;
    dispatch(setKeyValue('messageSending', true));
    messageSend(bodyRequest, params)
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
        dispatch(setKeyValue('messageSending', false));
        console.log('messageSend [error]', error);
      });
  };
