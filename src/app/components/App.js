import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {Provider} from 'react-redux';

import IntroSplash from '../containers/intro/splash';
import IntroPage from '../screens/intro/intro';
import LoginPage from '../containers/auth/login';
import RegisterEmail from '../containers/register/email';
import RegisterPassword from '../containers/register/password';
import RegisterProfile from '../containers/register/profile';

import TabHome from '../containers/home/index';
import TabChats from '../containers/chat/home';
import TabSettings from '../containers/settings/index';

import SettingsPassword from '../containers/settings/password';

import EventPage from '../containers/event/index';
import ChatPage from '../containers/chat/index';

import configureStore from '../store/configureStore';
import CustomTabBar from './tabs/tabBar';
import FirebaseService from '../services/Firebase';

const store = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Router>
            <Stack key="root">
              <Scene
                key="splash"
                title="Splash"
                initial={true}
                hideNavBar={true}
                component={IntroSplash}
              />
              <Scene
                key="intro"
                title="IntroPage"
                component={IntroPage}
                hideNavBar={true}
              />
              <Scene
                hideNavBar={true}
                key="login"
                title="LoginPage"
                component={LoginPage}
              />
              <Scene
                hideNavBar={true}
                key="registerEmail"
                title="RegisterEmail"
                component={RegisterEmail}
              />
              <Scene
                hideNavBar={true}
                key="registerPassword"
                title="RegisterPassword"
                component={RegisterPassword}
              />
              <Scene
                hideNavBar={true}
                key="registerProfile"
                title="RegisterProfile"
                component={RegisterProfile}
              />

              <Tabs
                key="home"
                hideNavBar={true}
                backToInitial={true}
                tabBarComponent={CustomTabBar}>
                <Scene key="tab1" hideNavBar={true}>
                  <Scene
                    key="topics"
                    title="Tab1"
                    component={TabHome}
                    hideNavBar={true}
                    iconName={'person-outline'}
                  />
                  <Scene
                    key="event"
                    title="Event"
                    component={EventPage}
                    hideNavBar={true}
                  />
                  <Scene
                    key="chat"
                    title="ChatPage"
                    component={ChatPage}
                    hideNavBar={true}
                  />
                </Scene>
                <Scene key="tab2" title="Tab2" hideNavBar={true}>
                  <Scene
                    key="home"
                    title="TabChats"
                    component={TabChats}
                    hideNavBar={true}
                  />
                  <Scene
                    key="chat"
                    title="ChatPage"
                    component={ChatPage}
                    hideNavBar={true}
                  />
                </Scene>
                <Scene key="tab3">
                  <Scene
                    key="settings"
                    title="Tab2"
                    component={TabSettings}
                    hideNavBar={true}
                  />
                  <Scene
                    key="password"
                    title="SettingsPassword"
                    component={SettingsPassword}
                    hideNavBar={true}
                  />
                </Scene>
              </Tabs>
            </Stack>
          </Router>
          <FirebaseService />
        </View>
      </Provider>
    );
  }
}

export default App;
