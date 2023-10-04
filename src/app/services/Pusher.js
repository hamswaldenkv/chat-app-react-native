import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import {PUSHER_API_KEY, PUSHER_CLUSTER} from '../config/pusher';
import EventsManager from '../util/EventUtil';

class PusherService extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.pusher = Pusher.getInstance();
  }
  componentDidMount() {
    setTimeout(() => this.initPusher(), 500);
  }

  async initPusher() {
    try {
      await this.pusher.init({
        apiKey: PUSHER_API_KEY,
        cluster: PUSHER_CLUSTER,
        onError: this.onError,
        onEvent: this.onGlobalEvent,
      });

      await this.pusher.connect();
      await this.pusher.subscribe({
        channelName: 'driver-events-channel',
        onEvent: this.onEvent,
        onSubscriptionError: (channelName, message, e) => {
          console.log(`Subscription failed: ${message}`);
        },
        onSubscriptionSucceeded: data => {
          console.log('Subscription succeeded:', data);
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

export default PusherService;
