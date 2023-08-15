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

const Message = ({
  id: thread_id,
  user_id,
  user_name,
  user_photo_url,
  content,
  description,
  created,
  currentUserId,
  kind,
  photo_url,
  ...props
}) => {
  return (
    <View style={styles.root}>
      <Ripple onPress={() => {}}>
        <View style={styles.container}>
          {currentUserId !== user_id && (
            <>
              <View style={styles.user}>
                <View style={styles.image}>
                  <Image
                    resizeMode="cover"
                    source={
                      user_photo_url ? urlToURI(user_photo_url) : DEFAULT_COVER
                    }
                    style={ThemeStyle.imageFill}
                  />
                </View>
                <View>
                  <Text style={styles.text}>{user_name}</Text>
                  <Text style={styles.date}>
                    {moment(created).format('HH:mm')}
                  </Text>
                </View>
              </View>
              <View style={styles.content}>
                {kind === 'photo' && (
                  <View style={styles.contentPhoto}>
                    <Image
                      source={{uri: photo_url}}
                      style={{height: 300}}
                      resizeMode="cover"
                    />
                  </View>
                )}
                <Text style={styles.title}>{content}</Text>
              </View>
            </>
          )}
          {currentUserId === user_id && (
            <>
              <View style={styles.contentRight}>
                {kind === 'photo' && (
                  <View style={styles.contentPhoto}>
                    <Image
                      source={{uri: photo_url}}
                      style={{height: 300}}
                      resizeMode="cover"
                    />
                  </View>
                )}
                <Text style={styles.titleRight}>{content}</Text>
              </View>
              <Text style={styles.dateRight}>
                {moment(created).format('HH:mm')}
              </Text>
            </>
          )}
        </View>
      </Ripple>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},

  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  user: {flexDirection: 'row'},

  image: {
    overflow: 'hidden',
    backgroundColor: '#2c3e50',
    borderRadius: 30 / 2,
    height: 30,
    width: 30,
    marginRight: 10,
  },

  content: {
    width: '80%',
    padding: 15,
    paddingHorizontal: 15,
    backgroundColor: ThemeColors.primary[500],
    borderRadius: 10,
    borderTopLeftRadius: 0,
    marginTop: 5,
  },

  contentRight: {
    width: '80%',
    padding: 15,
    paddingHorizontal: 15,
    backgroundColor: ThemeColors.white,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },

  contentPhoto: {
    margin: -10,
    marginBottom: 10,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    overflow: 'hidden',
  },

  title: {
    fontSize: 13,
    lineHeight: 15,
    color: ThemeColors.white,
  },

  titleRight: {
    fontSize: 13,
    lineHeight: 15,
    color: ThemeColors.title,
  },

  text: {
    fontSize: 12,
    color: ThemeColors.textPrimary,
    fontFamily: ThemeFonts.Semibold,
  },

  date: {
    fontSize: 10,
    color: ThemeColors.description,
    fontFamily: ThemeFonts.Medium,
  },

  dateRight: {
    fontSize: 10,
    color: ThemeColors.description,
    fontFamily: ThemeFonts.Medium,
    textAlign: 'right',
  },
});

export default Message;
