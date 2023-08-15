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

const Episode = ({image, title}) => {
  return (
    <Ripple>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            resizeMode="cover"
            source={image ? urlToURI(image) : DEFAULT_COVER}
            style={ThemeStyle.imageFill}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.headerText}>EPS. 10</Text>
          <View style={styles.titles}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.subTitle}>11 Janv - 33 min</Text>
            <View style={styles.playButton}>
              {ionIcon('play')}
              <Text style={styles.playButtonText}>Lire</Text>
            </View>
          </View>
        </View>
      </View>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 7.5,
  },

  image: {
    overflow: 'hidden',
    backgroundColor: '#2c3e50',
    borderRadius: 4,
    height: 100,
    width: 100,
  },

  titles: {
    flex: 1,
    paddingVertical: 10,
  },

  headerText: {
    fontSize: 12,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Medium,
  },

  title: {
    fontSize: 13,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Semibold,
  },

  subTitle: {
    fontSize: 12,
    color: ThemeColors.descriptionWhite,
    fontFamily: ThemeFonts.Medium,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingRight: 0,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: ThemeColors.white,
  },

  playButtonText: {
    fontSize: 12,
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Medium,
    marginLeft: 5,
  },
});

export default Episode;
