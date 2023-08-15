/* eslint-disable curly */
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThemeStyle from '../../resources/style';
import ThemeColors from '../../resources/color';
import AppStatusBar from '../../components/header/statusbar';
import Header from '../../components/header/light';
import ThemeFonts from '../../resources/font';
import Button from '../../components/button/Button';

class SettingsPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      accountPassword: '',
      confirmPassword: '',
    };
  }

  onRequestSubmit() {
    const {currentPassword, accountPassword, confirmPassword} = this.state;
    if (
      currentPassword === '' ||
      accountPassword === '' ||
      confirmPassword === ''
    ) {
      Alert.alert('Invalide', 'Veuillez entrer tous les champs !');
      return;
    }

    let bodyRequest = {
      password_current: currentPassword,
      password_new: accountPassword,
    };
    const {updatePassword} = this.props;
    if (updatePassword) updatePassword(bodyRequest);
  }

  render() {
    const {loading} = this.props;
    return (
      <LinearGradient
        locations={[0, 0.5]}
        style={ThemeStyle.fill}
        colors={['#383838', ThemeColors.pageBackground]}>
        <AppStatusBar />
        <Header
          title=""
          rightActions={[
            {iconName: 'share-social-outline', onPress: () => {}},
            {iconName: 'log-out-outline', onPress: () => {}},
          ]}
        />
        <ScrollView style={ThemeStyle.fill}>
          <View style={styles.form}>
            <Text style={styles.pageTitle}>Modifier votre mot de passe</Text>
            <View style={ThemeStyle.formGroup}>
              <TextInput
                secureTextEntry
                autoCapitalize="none"
                placeholder="Mot de passe actuel"
                style={ThemeStyle.textInputDark}
                placeholderTextColor={ThemeColors.textPlaceholderDark}
                onChangeText={currentPassword =>
                  this.setState({currentPassword})
                }
              />
            </View>
            <View style={ThemeStyle.formGroup}>
              <TextInput
                secureTextEntry
                autoCapitalize="none"
                placeholder="Nouveau Mot de passe"
                style={ThemeStyle.textInputDark}
                placeholderTextColor={ThemeColors.textPlaceholderDark}
                onChangeText={accountPassword =>
                  this.setState({accountPassword})
                }
              />
            </View>
            <View style={ThemeStyle.formGroup}>
              <TextInput
                secureTextEntry
                autoCapitalize="none"
                placeholder="Confirmer le mot de passe"
                style={ThemeStyle.textInputDark}
                placeholderTextColor={ThemeColors.textPlaceholderDark}
                onChangeText={confirmPassword =>
                  this.setState({confirmPassword})
                }
              />
            </View>

            <Button
              isLoading={loading}
              style={[ThemeStyle.buttonPrimary, {marginTop: 10}]}
              onPress={() => this.onRequestSubmit()}
              textStyle={[
                ThemeStyle.buttonPrimaryText,
                {textTransform: 'uppercase', fontSize: 12},
              ]}>
              Mettre à jour
            </Button>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 30,
  },

  avatar: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    backgroundColor: ThemeColors.dark[900],
    overflow: 'hidden',
  },

  avatarTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },

  avatarText: {
    fontSize: 30,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Medium,
    textAlign: 'center',
  },

  pageTitle: {
    fontSize: 26,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Semibold,
    marginBottom: 20,
  },

  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuItemText: {
    fontSize: 13,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Medium,
  },
});

export default SettingsPassword;
