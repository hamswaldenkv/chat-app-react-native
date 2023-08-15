/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, TextInput} from 'react-native';
import AppStatusBar from '../../components/header/statusbar';
import ThemeFonts from '../../resources/font';
import ThemeColors from '../../resources/color';
import ThemeStyle from '../../resources/style';
import Button from '../../components/button/Button';
import Header from '../../components/header/light';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textContainer: {
    padding: 30,
  },

  title: {
    fontSize: 30,
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

  formContainer: {paddingVertical: 20},

  buttonsContainer: {
    paddingTop: 20,
    paddingHorizontal: 30,
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileName: '',
      accountPassword: '',
    };
  }

  onRequestSubmit() {
    const {profileName} = this.state;

    if (profileName === '') return null;

    const {registerUser, emailAddress, accountPassword} = this.props;

    let body = {
      username: emailAddress,
      password: accountPassword,
      profile_name: profileName,
    };
    if (registerUser) registerUser(body);
  }

  render() {
    const {loading} = this.props;
    return (
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        style={styles.container}
        colors={[ThemeColors.dark[950], ThemeColors.primary[950]]}>
        <AppStatusBar />
        <Header
          title=""
          borderComponent={
            <View
              style={{height: 0.5, backgroundColor: ThemeColors.borderColor}}
            />
          }
          rightActions={[
            {
              iconName: 'alert-circle-outline',
              onPress: () => {},
            },
            {
              iconName: 'language-outline',
              onPress: () => {},
            },
          ]}
        />
        <ScrollView style={ThemeStyle.fill}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Entrez votre nom</Text>
            <Text style={styles.description}>
              Ce nom sera affiché dans votre profil
            </Text>

            <View style={styles.formContainer}>
              <View style={ThemeStyle.formGroup}>
                <TextInput
                  style={ThemeStyle.textInputDark}
                  placeholderTextColor={ThemeColors.textPlaceholderDark}
                  placeholder="ex: Paul"
                  onChangeText={profileName => this.setState({profileName})}
                />
              </View>
              <Button
                isLoading={loading}
                style={ThemeStyle.buttonPrimary}
                onPress={() => this.onRequestSubmit()}
                textStyle={[
                  ThemeStyle.buttonPrimaryText,
                  {textTransform: 'uppercase', fontSize: 12},
                ]}>
                Continuer
              </Button>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default LoginPage;
