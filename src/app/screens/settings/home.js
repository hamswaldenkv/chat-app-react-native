/* eslint-disable curly */
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThemeStyle from '../../resources/style';
import ThemeColors from '../../resources/color';
import AppStatusBar from '../../components/header/statusbar';
import Header from '../../components/header/light';
import ThemeFonts from '../../resources/font';
import Ripple from '../../components/touch/Ripple';
import {ionIcon} from '../../resources/icon';

class SettingsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        {title: 'Compte', onPress: () => {}},
        {title: 'Modifier mon profil', onPress: () => {}},
        {title: 'Mot de passe', onPress: () => {}},
        {title: 'Notifications', onPress: () => {}},
        {title: 'Aide', onPress: () => {}},
        {title: 'Confidentialité', onPress: () => {}},
        {title: 'Deconnexion', onPress: () => this.onRequestLogout()},
      ],
    };
  }

  onRequestHelp() {}

  onRequestLogout() {
    const {destroySession} = this.props;
    if (destroySession) destroySession();
  }

  render() {
    const {profileName} = this.props;
    const {menuItems} = this.state;
    return (
      <View style={ThemeStyle.fill}>
        <AppStatusBar />
        <View style={{backgroundColor: ThemeColors.primary[500]}}>
          <Header
            title=""
            rightActions={[
              {
                iconName: 'log-out-outline',
                onPress: () => this.onRequestLogout(),
              },
            ]}
          />
        </View>
        <ScrollView style={ThemeStyle.fill}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Image
                style={ThemeStyle.imageFill}
                source={require('../../../assets/images/photo-empty.jpeg')}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.profileText}>{profileName}</Text>
          </View>
          <FlatList
            data={menuItems}
            keyExtractor={(_, x) => `menu-${x}`}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 0.7,
                  backgroundColor: '#818181',
                  marginHorizontal: 20,
                }}
              />
            )}
            ListFooterComponent={<View style={{height: 40}} />}
            renderItem={({item}) => (
              <Ripple onPress={item.onPress || null}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                  {ionIcon('chevron-forward', 14, ThemeColors.white)}
                </View>
              </Ripple>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

  profileText: {
    fontSize: 26,
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Semibold,
    textAlign: 'center',
    marginVertical: 10,
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
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Medium,
  },
});

export default SettingsHome;
