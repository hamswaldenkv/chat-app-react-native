import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ThemeStyle from '../../resources/style';
import ThemeColors from '../../resources/color';
import ThemeFonts from '../../resources/font';
import Ripple from '../touch/Ripple';

const DEFAULT_COVER = require('../../../assets/images/photo-empty.jpeg');

const urlToURI = url => {
  return {uri: url};
};

const AvatarProfile = ({image, title, hideName = true, onPress}) => {
  return (
    <View style={styles.root}>
      <Ripple onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              resizeMode="cover"
              source={image ? urlToURI(image) : DEFAULT_COVER}
              style={ThemeStyle.imageFill}
            />
          </View>
          {!hideName && (
            <View style={styles.titles}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
        </View>
      </Ripple>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {marginRight: 10},

  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    overflow: 'hidden',
    borderRadius: 60 / 2,
    height: 60,
    width: 60,
  },

  titles: {paddingVertical: 10},

  title: {
    fontSize: 10,
    textAlign: 'center',
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Medium,
  },
});

export default AvatarProfile;
