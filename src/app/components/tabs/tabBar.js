/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ionIcon} from '../../resources/icon';
import ThemeColors from '../../resources/color';

const routeIcon = key => {
  let icon = {};
  icon['tab1'] = 'search-outline';
  icon['tab2'] = 'chatbubble-ellipses-outline';
  icon['tab3'] = 'person-outline';

  return icon[key] || 'home-outline';
};

const TabIcon = ({
  iconName = 'person-outline',
  focused,
  title = 'Tab',
  ...rest
}) => {
  var color = focused ? ThemeColors.dark[950] : ThemeColors.dark[400];

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
          backgroundColor: ThemeColors.secondary[950],
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          height: 55,
        }}>
        {state.routes.map((element, x) => (
          <TouchableOpacity
            key={element.key}
            onPress={() => Actions[element.key]()}>
            <TabIcon
              {...element}
              iconName={routeIcon(element.key)}
              selected={activeTabIndex === x}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
