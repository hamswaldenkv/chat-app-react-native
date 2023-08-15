import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getStatusBarHeight} from '../../util/DeviceUtil';
import {ionIcon} from '../../resources/icon';
import ThemeColors from '../../resources/color';
import Ripple from '../touch/Ripple';
import ThemeFonts from '../../resources/font';

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },

  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  title: {
    fontFamily: ThemeFonts.Semibold,
  },
});

export default function Header({
  title = 'Page Title',
  borderComponent = null,
  rightActions = [],
  leftActions = [],
  textColor = '#FFF',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        {Array.isArray(leftActions) && (
          <View style={styles.icons}>
            {leftActions.map((item, x) => (
              <Ripple key={x} onPress={item.onPress || null}>
                <View style={{padding: 10}}>
                  {ionIcon(
                    item.iconName || 'reader-outline',
                    30,
                    ThemeColors.borderColor,
                  )}
                </View>
              </Ripple>
            ))}
          </View>
        )}
        <Text style={[styles.title, {color: textColor}]}>{title}</Text>
        {Array.isArray(rightActions) && (
          <View style={styles.icons}>
            {rightActions.map((item, x) => (
              <Ripple key={x} onPress={item.onPress || null}>
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
