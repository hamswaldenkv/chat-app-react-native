/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ionIcon} from '../../resources/icon';
import ThemeColors from '../../resources/color';
import ThemeFonts from '../../resources/font';

const routeIcon = key => {
  let icon = {};
  icon['tab1'] = 'search-outline';
  icon['tab2'] = 'chatbubble-ellipses-outline';
  icon['tab3'] = 'person-outline';

  return icon[key] || 'home-outline';
};
const routeText = key => {
  let icon = {};
  icon['tab1'] = 'Events';
  icon['tab2'] = 'Chats';
  icon['tab3'] = 'Profile';

  return icon[key] || 'home-outline';
};

const TabIcon = ({
  iconName = 'person-outline',
  focused,
  title = 'Tab',
  ...rest
}) => {
  var color = focused ? ThemeColors.white : ThemeColors.descriptionWhite;

  // console.log('rest:', rest);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      {ionIcon(iconName || 'circle', 25, color)}
      <Text
        style={{
          fontFamily: ThemeFonts.Medium,
          marginTop: 4,
          fontSize: 12,
          color,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default class CustomTabBar extends React.Component {
  render() {
    const {state} = this.props.navigation;
    const activeTabIndex = state.index;

    return (
      <View
        style={{
          backgroundColor: ThemeColors.pageBackground,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: 20,
          height: 60,
        }}>
        {state.routes.map((element, x) => (
          <TouchableOpacity
            key={element.key}
            onPress={() => Actions[element.key]()}>
            <TabIcon
              {...element}
              iconName={routeIcon(element.key)}
              title={routeText(element.key)}
              selected={activeTabIndex === x}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
