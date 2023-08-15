/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
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
      accountPassword: '',
      confirmPassword: '',
    };
  }

  onRequestSubmit() {
    const {accountPassword, confirmPassword} = this.state;

    if (accountPassword === '') return null;
    if (accountPassword !== confirmPassword) {
      Alert.alert(
        'Invalide',
        'Les mots de passe entrés ne correspondent pas !',
        [{text: 'Fermer'}],
      );
      return null;
    }

    const {emailAddress} = this.props;
    Actions.registerProfile({emailAddress, accountPassword});
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
            <Text style={styles.title}>Créer un mote de passe</Text>
            <Text style={styles.description}>
              Entrez un mot de passe sécurisé pour votre compte
            </Text>

            <View style={styles.formContainer}>
              <View style={ThemeStyle.formGroup}>
                <TextInput
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder="Mot de passe"
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
