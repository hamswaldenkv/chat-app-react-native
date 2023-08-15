import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import ThemeStyle from '../../resources/style';
import Ripple from '../touch/Ripple';
import ThemeColors from '../../resources/color';
import ThemeFonts from '../../resources/font';
import {ionIcon} from '../../resources/icon';

const DEFAULT_COVER = require('../../../assets/images/cover-intro-05.jpeg');

const urlToURI = url => {
  return {uri: url};
};

const Profile = ({image, title, description}) => {
  return (
    <View style={styles.root}>
      <Ripple>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              resizeMode="cover"
              source={image ? urlToURI(image) : DEFAULT_COVER}
              style={ThemeStyle.imageFill}
            />
          </View>
          <View style={styles.titles}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </View>
      </Ripple>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {marginRight: 10},

  container: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  image: {
    overflow: 'hidden',
    backgroundColor: '#2c3e50',
    borderRadius: 100 / 2,
    height: 100,
    width: 100,
  },

  titles: {
    paddingVertical: 10,
  },

  title: {
    fontSize: 12,
    lineHeight: 14,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Semibold,
    marginBottom: 3,
    textAlign: 'center',
  },

  descrtiption: {
    fontSize: 12,
    lineHeight: 14,
    color: ThemeColors.descriptionWhite,
    fontFamily: ThemeFonts.Semibold,
  },

  playButton: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: ThemeColors.white,
  },
});

export default Profile;
