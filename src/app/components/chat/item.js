import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import ThemeStyle from '../../resources/style';
import Ripple from '../touch/Ripple';
import ThemeColors from '../../resources/color';
import ThemeFonts from '../../resources/font';
import {ionIcon} from '../../resources/icon';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

const DEFAULT_COVER = require('../../../assets/images/photo-empty.jpeg');

const urlToURI = url => {
  return {uri: url};
};

const Chat = ({
  id: thread_id,
  photo_url,
  title,
  description,
  updated,
  ...props
}) => {
  return (
    <View style={styles.root}>
      <Ripple onPress={() => Actions.chat({thread_id})}>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              resizeMode="cover"
              source={photo_url ? urlToURI(photo_url) : DEFAULT_COVER}
              style={ThemeStyle.imageFill}
            />
          </View>
          <View style={styles.titles}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.descrtiption} numberOfLines={1}>
              {description}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>{moment(updated).format('HH:mm')}</Text>
          </View>
        </View>
      </Ripple>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderBottomColor: ThemeColors.borderColor,
    borderBottomWidth: 0.5,
  },

  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    overflow: 'hidden',
    backgroundColor: '#2c3e50',
    borderRadius: 50 / 2,
    height: 50,
    width: 50,
  },

  titles: {
    paddingHorizontal: 20,
    flex: 1,
  },

  title: {
    fontSize: 14,
    lineHeight: 14,
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Semibold,
    marginBottom: 4,
  },

  descrtiption: {
    fontSize: 12,
    lineHeight: 14,
    color: ThemeColors.description,
    fontFamily: ThemeFonts.Medium,
  },

  text: {
    fontSize: 12,
    color: ThemeColors.description,
    fontFamily: ThemeFonts.Medium,
  },
});

export default Chat;
