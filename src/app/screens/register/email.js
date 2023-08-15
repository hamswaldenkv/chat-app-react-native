/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import AppStatusBar from '../../components/header/statusbar';
import ThemeFonts from '../../resources/font';
import ThemeColors from '../../resources/color';
import ThemeStyle from '../../resources/style';
import Button from '../../components/button/Button';
import Header from '../../components/header/light';
import {ionIcon} from '../../resources/icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {marginBottom: 20},

  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  title: {
    fontSize: 30,
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Bold,
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: ThemeColors.description,
    fontFamily: ThemeFonts.Medium,
  },

  formContainer: {paddingVertical: 20, paddingHorizontal: 20},

  buttonsContainer: {
    paddingHorizontal: 20,
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      userPassword: '',
    };
  }

  onRequestSubmit() {
    const {emailAddress, userPassword, firstName, lastName} = this.state;

    if (
      emailAddress === '' ||
      userPassword === '' ||
      firstName === '' ||
      lastName === ''
    )
      return null;

    let body = {emailAddress, userPassword, firstName, lastName};
    const {registerUser} = this.props;
    if (registerUser) registerUser(body);
  }

  render() {
    const {loading} = this.props;
    return (
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        style={styles.container}
        colors={[ThemeColors.white, ThemeColors.white]}>
        <AppStatusBar />
        <View style={{backgroundColor: ThemeColors.primary[500]}}>
          <Header
            title=""
            borderComponent={
              <View
                style={{height: 0.5, backgroundColor: ThemeColors.borderColor}}
              />
            }
            leftActions={[
              {
                iconName: 'arrow-back-outline',
                onPress: () => {},
              },
            ]}
          />
        </View>
        <ScrollView style={ThemeStyle.fill}>
          <View style={styles.textContainer}>
            <View style={styles.logo}>
              {ionIcon('chatbubble-ellipses', 75, ThemeColors.primary[500])}
            </View>
            <Text style={styles.title}>Créez un compte</Text>
            <Text style={styles.description}>
              compléter les infos pour continuer
            </Text>
          </View>
          <View style={styles.formContainer}>
            <View style={ThemeStyle.formGroup}>
              <TextInput
                autoCapitalize="words"
                style={ThemeStyle.textInput}
                placeholderTextColor={ThemeColors.textPlaceholder}
                placeholder="Prenom"
                onChangeText={firstName => this.setState({firstName})}
              />
            </View>
            <View style={ThemeStyle.formGroup}>
              <TextInput
                autoCapitalize="words"
                style={ThemeStyle.textInput}
                placeholderTextColor={ThemeColors.textPlaceholder}
                placeholder="Nom de famille"
                onChangeText={lastName => this.setState({lastName})}
              />
            </View>
            <View style={ThemeStyle.formGroup}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                style={ThemeStyle.textInput}
                placeholderTextColor={ThemeColors.textPlaceholder}
                placeholder="Entrez votre adresse email"
                onChangeText={emailAddress => this.setState({emailAddress})}
              />
            </View>
            <View style={ThemeStyle.formGroup}>
              <TextInput
                secureTextEntry
                autoCapitalize="none"
                style={ThemeStyle.textInput}
                placeholderTextColor={ThemeColors.textPlaceholder}
                placeholder="Mot de passe"
                onChangeText={userPassword => this.setState({userPassword})}
              />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              isLoading={loading}
              style={ThemeStyle.buttonPrimary}
              onPress={() => this.onRequestSubmit()}
              textStyle={[
                ThemeStyle.buttonPrimaryText,
                {textTransform: 'uppercase', fontSize: 12},
              ]}>
              Créer un compte
            </Button>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default LoginPage;
