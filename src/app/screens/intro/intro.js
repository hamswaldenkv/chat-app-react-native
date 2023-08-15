/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import AppStatusBar from '../../components/header/statusbar';
import ThemeFonts from '../../resources/font';
import ThemeColors from '../../resources/color';
import ThemeStyle from '../../resources/style';
import Button from '../../components/button/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
  },

  title: {
    fontSize: 60,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Bold,
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
    textAlign: 'center',
    fontFamily: ThemeFonts.Medium,
  },

  buttonsContainer: {
    paddingTop: 20,
  },
});

class IntroPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar />
        <Image
          resizeMode="cover"
          source={require('../../../assets/images/cover-intro-04.jpeg')}
          style={{height: '100%', width: '100%'}}
        />
        <View style={ThemeStyle.overlay} />
        <View style={ThemeStyle.absolute}>
          <View style={styles.textContainer}>
            <View style={{flex: 1, paddingTop: 40}}>
              <Text style={styles.title}>Yoka</Text>
              <Text style={styles.description}>
                Ecoutez vos podcasts, cours & Prédications partout et à
                n'importe quel moment
              </Text>
            </View>

            <View style={styles.buttonsContainer}>
              <Button
                style={ThemeStyle.buttonPrimary}
                textStyle={[
                  ThemeStyle.buttonPrimaryText,
                  {textTransform: 'uppercase', fontSize: 12},
                ]}>
                Commencer
              </Button>
              <Button
                style={ThemeStyle.buttonWhite}
                textStyle={[
                  ThemeStyle.buttonWhiteText,
                  {textTransform: 'uppercase', fontSize: 12},
                ]}>
                Se Connecter
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default IntroPage;
