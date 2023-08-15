import React from 'react';
import {Platform, StatusBar} from 'react-native';

export default function AppStatusBar() {
  return (
    <StatusBar
      translucent
      barStyle="light-content"
      backgroundColor="rgba(0, 0, 0, 0.251)"
    />
  );
}

export const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0;
