/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Header from '../../components/header/light';
import ThemeFonts from '../../resources/font';
import AppStatusBar from '../../components/header/statusbar';
import ThemeColors from '../../resources/color';
import {ionIcon} from '../../resources/icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerContainer: {
    padding: 15,
  },

  footerText: {
    fontSize: 13,
    fontFamily: ThemeFonts.Bold,
    color: 'white',
    textAlign: 'center',
  },
});

class IntroSplash extends Component {
  componentDidMount() {
    setTimeout(() => this.checkIfLogged(), 2000);
  }

  checkIfLogged() {
    const {checkSession} = this.props;
    if (checkSession) checkSession();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar />
        <View style={styles.logoContainer}>
          {ionIcon('chatbubble-ellipses', 75, ThemeColors.primary[500])}
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>App copyrights</Text>
        </View>
      </View>
    );
  }
}

export default IntroSplash;
