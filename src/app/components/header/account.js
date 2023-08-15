import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getStatusBarHeight} from '../../util/DeviceUtil';
import {ionIcon} from '../../resources/icon';
import ThemeColors from '../../resources/color';
import Ripple from '../touch/Ripple';

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },

  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default function Header({
  title = 'Page Title',
  borderComponent = null,
  rightActions = [],
}) {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text>{title}</Text>
        {Array.isArray(rightActions) && (
          <View style={styles.icons}>
            {rightActions.map((item, x) => (
              <Ripple key={x}>
                <View style={{padding: 10}}>
                  {ionIcon(
                    item.iconName || 'reader-outline',
                    25,
                    ThemeColors.borderColor,
                  )}
                </View>
              </Ripple>
            ))}
          </View>
        )}
      </View>
      {borderComponent}
    </View>
  );
}
