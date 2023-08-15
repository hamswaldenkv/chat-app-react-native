import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThemeStyle from '../../resources/style';
import Ripple from '../touch/Ripple';
import ThemeColors from '../../resources/color';
import ThemeFonts from '../../resources/font';
import {Actions} from 'react-native-router-flux';
import Calendar from '../calendar/minimal';

const DEFAULT_COVER = require('../../../assets/images/cover-intro-05.jpeg');

const urlToURI = url => {
  return {uri: url};
};

const Event = ({
  title,
  description,
  image_large,
  start_at,
  count_participants,
  ...props
}) => {
  return (
    <View style={styles.root}>
      <Ripple
        onPress={() => {
          const _event = {
            title,
            description,
            image_large,
            start_at,
            count_participants,
            ...props,
          };
          Actions.event({event: _event});
        }}>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              resizeMode="cover"
              source={image_large ? urlToURI(image_large) : DEFAULT_COVER}
              style={ThemeStyle.imageFill}
            />
            <LinearGradient
              locations={[0, 0.8]}
              style={[ThemeStyle.absolute, styles.overlay]}
              colors={[ThemeColors.transparent, ThemeColors.dark[950]]}>
              <View style={styles.header}>
                <View />
                <Calendar date={start_at} />
              </View>

              <View style={styles.titles}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.descrtiption} numberOfLines={1}>
                  {count_participants} participants
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Ripple>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {paddingHorizontal: 20, paddingVertical: 10},

  container: {},

  image: {
    overflow: 'hidden',
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    height: 250,
    width: '100%',
  },

  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titles: {
    paddingVertical: 10,
  },

  title: {
    fontSize: 25,
    lineHeight: 25,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Semibold,
    marginBottom: 3,
  },

  descrtiption: {
    fontSize: 12,
    lineHeight: 14,
    color: ThemeColors.descriptionWhite,
    fontFamily: ThemeFonts.Semibold,
  },

  calendarContainer: {
    height: 40,
    width: 30,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: ThemeColors.white,
  },
});

export default Event;
