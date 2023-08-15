import React from 'react';
import {View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

function simpleLineIcon(name, size, color, onPress = null) {
  return (
    <SimpleLineIcons
      name={name}
      type="simple-line-icon"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}

function materialIcon(name, size, color, onPress = null) {
  return (
    <MaterialIcons
      name={name}
      type="material"
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}

function ionIcon(name, size, color, styles = null, onPress = null) {
  return (
    <View style={styles}>
      <Ionicons
        name={name}
        type="ionicon"
        color={color}
        size={size}
        onPress={onPress}
      />
    </View>
  );
}

function featherIcon(name, size, color, styles = null, onPress = null) {
  return (
    <View style={styles}>
      <Feather
        name={name}
        type="feather"
        color={color}
        size={size}
        onPress={onPress}
      />
    </View>
  );
}
function antIcon(name, size, color, styles = null, onPress = null) {
  return (
    <View style={styles}>
      <AntDesign
        name={name}
        type="feather"
        color={color}
        size={size}
        onPress={onPress}
      />
    </View>
  );
}

export {ionIcon, simpleLineIcon, materialIcon, featherIcon, antIcon};
