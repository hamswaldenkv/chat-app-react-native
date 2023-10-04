import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {PUSHER_API_KEY, PUSHER_CLUSTER} from '../config/pusher';

class ChatEventService extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.pusher = Pusher.getInstance();
  }

  componentDidMount() {
    this.initPusher();
  }

  componentWillUnmount() {
    // eslint-disable-next-line curly
    if (this.pusher) this.disconnectPusher();
  }

  disconnectPusher = async () => this.pusher.disconnect();

  async initPusher() {
    const {chatId} = this.props;
    const channelName = `incoming-message-${chatId}`;
    try {
      await this.pusher.init({
        apiKey: PUSHER_API_KEY,
        cluster: PUSHER_CLUSTER,
        onError: this.onError,
      });

      await this.pusher.connect();
      await this.pusher.subscribe({
        channelName,
        onEvent: this.onEvent,
        onSubscriptionError: (channelName, message, e) => {
          console.log(`Subscription failed: ${message}`);
        },
        onSubscriptionSucceeded: data => {
          console.log(`Subscription succeeded to ${channelName}:`, data);
        },
      });
    } catch (error) {
      console.log('Failed to connect at pusher:', error);
    }
  }

  onError = (message, code, error) => {
    console.log(`onError: ${message} code: ${code} exception: ${error}`);
  };

  onEvent = event => {
    console.log(`Event received: ${event}`);
  };

  onGlobalEvent = event => {
    console.log(`Event received: ${event}`);
  };

  render() {
    return null;
  }
}

export default ChatEventService;
