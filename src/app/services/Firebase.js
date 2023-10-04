import React, {Component} from 'react';
import {connect} from 'react-redux';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import EventsManager from '../util/EventUtil';
import ThemeColors from '../resources/color';
import {updateDeviceToken} from '../actions/settings';
import {isNullOrEmpty} from '../util/TextUtil';

const showLog = (data, title = 'console', show = true) => {
  if (show) console.log(title, JSON.stringify(data, null, 2));
};

const DEFAULT_CHANNEL_ID = 'my-appname-notif-channel';

class FirebaseService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uniqueId: '',
      deviceId: '',
      deviceName: '',
      deviceBrand: '',
      deviceModel: '',
      osVersion: '',
      platform: '',
      channelId: 'fcm_fallback_notification_channel',
    };
  }

  componentDidMount() {
    EventsManager.getInstance().on('requestNotifications', this.onInit);
    EventsManager.getInstance().on('userDisconnected', this.userDisconnected);
    EventsManager.getInstance().on('subscribeToTopic', this.subscribeToTopic);
    EventsManager.getInstance().on(
      'unsubscribeFromTopic',
      this.unsubscribeFromTopic,
    );

    // get channels
    this.getChannels();
    // get device info
    this.getDeviceInfo();
    // Handle notifications events
    this.handleNotifications();
  }

  componentWillUnmount() {
    EventsManager.getInstance().off('requestNotifications', this.onInit);
    EventsManager.getInstance().off('userDisconnected', this.userDisconnected);
    EventsManager.getInstance().off('subscribeToTopic', this.subscribeToTopic);
    EventsManager.getInstance().off(
      'unsubscribeFromTopic',
      this.unsubscribeFromTopic,
    );

    if (this.notificationOpenedListener) this.notificationOpenedListener();
    if (this.notificationListener) this.notificationListener();
    if (this.onTokenRefreshListener) this.onTokenRefreshListener();
  }

  getChannels() {
    let _this = this;
    PushNotification.getChannels(function (channel_ids) {
      showLog(channel_ids, 'getChannels');

      // const [channelId] = channel_ids;
      // (channelId) _this.setState({channelId});
    });

    PushNotification.createChannel(
      {
        channelId: DEFAULT_CHANNEL_ID, // (required)
        channelName: `My App Channel`, // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created =>
        console.log(
          `createChannel '${DEFAULT_CHANNEL_ID}' returned '${created}'`,
        ), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  onInit = () => this.requestPermission();

  userDisconnected = () => {
    messaging()
      .deleteToken()
      .then(() => {
        console.log('deleteToken [success]');
      });
  };

  subscribeToTopic = topicName => {
    messaging()
      .subscribeToTopic(topicName)
      .then(result => {
        console.log('subscribeToTopic', result);
      });
  };

  unsubscribeFromTopic = topicName => {
    messaging().unsubscribeFromTopic(topicName);
  };

  /**
   * Get device info
   */
  getDeviceInfo() {
    let deviceId = DeviceInfo.getDeviceId();
    let deviceBrand = DeviceInfo.getBrand();
    let deviceModel = DeviceInfo.getModel();
    let platform = DeviceInfo.getSystemName();
    let osVersion = DeviceInfo.getSystemVersion();
    this.setState({
      deviceId,
      deviceBrand,
      deviceModel,
      osVersion,
      platform,
    });

    DeviceInfo.getDeviceName().then(deviceName => {
      this.setState({deviceName});
    });

    DeviceInfo.getUniqueId().then(uniqueId => {
      this.setState({uniqueId});
    });
  }

  /**
   * Request notifications permissions
   */
  async requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      this.getToken();
    }
  }

  /**
   * Handle notifications events
   */
  handleNotifications() {
    this.onTokenRefreshListener = messaging().onTokenRefresh(fcmToken => {
      console.log('onTokenRefreshListener (Received new Token)', fcmToken);
      this.sendFirebaseToken(fcmToken);
    });

    this.notificationListener = messaging().onMessage(async remoteMessage => {
      let {notification, data} = remoteMessage;

      console.log(
        'onMessage [remoteMessage]',
        JSON.stringify(remoteMessage, null, 2),
      );

      this.handleNotification(notification, data);
      this.displayNotification(notification, data);
    });

    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log(
          'onNotificationOpenedApp [remoteMessage]',
          JSON.stringify(remoteMessage, null, 2),
        );

        let {notification, data} = remoteMessage;
        this.handleNotification(notification, data);
      },
    );
  }

  /**
   * handle notification payloads
   * @param {*} notification
   * @param {*} data
   */
  handleNotification(notification, data) {
    console.log('handleNotification [data]', JSON.stringify(data, null, 2));

    if (data.eventName) {
      const {eventName, eventData} = data;
      EventsManager.getInstance()._emit(eventName, eventData);
    }
  }

  /**
   * get Token
   * @returns
   */
  async getToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('got token');
        console.log('fcm token:', fcmToken);
        this.sendFirebaseToken(fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.warn('notification token error', error);
    }
  }

  displayNotification(notification, data) {
    const {title, body} = notification;
    const {image, icon} = data;
    const details = {
      channelId: DEFAULT_CHANNEL_ID,
      autoCancel: true,
      title: title,
      message: body,
      color: ThemeColors.primary[500],
      smallIcon: 'ic_stat_ic_notification',
      bigLargeIcon: 'ic_stat_ic_notification',
    };
    if (icon && !isNullOrEmpty(icon)) details.largeIconUrl = icon;
    if (image && !isNullOrEmpty(image)) details.bigPictureUrl = image;

    PushNotification.localNotification(details);
  }

  /**
   * Send firebase token to server for push notifications to unique driver
   * @param {*} fcmToken
   */
  sendFirebaseToken(fcmToken) {
    const {
      uniqueId,
      deviceId,
      deviceName,
      deviceBrand,
      deviceModel,
      osVersion,
      platform,
    } = this.state;

    let bodyParams = {
      firebaseToken: fcmToken,
      uniqueId,
      deviceBrand,
      deviceId,
      deviceName,
      deviceModel,
      osVersion,
      platform,
    };

    const {updateDeviceToken} = this.props;
    if (updateDeviceToken) updateDeviceToken(bodyParams);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {updateDeviceToken};

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseService);
