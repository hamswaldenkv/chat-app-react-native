/* eslint-disable curly */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import ThemeColors from '../../resources/color';
import ThemeFonts from '../../resources/font';

const Calendar = ({date}) => {
  if (!date) return null;
  let formatted = moment(date);
  return (
    <View style={styles.container}>
      <Text style={styles.dateNumber}>{formatted.format('DD')}</Text>
      <Text style={styles.dateText}>{formatted.format('MMM')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateNumber: {
    fontFamily: ThemeFonts.Bold,
    fontSize: 16,
    color: ThemeColors.title,
    textAlign: 'center',
    marginBottom: 2,
  },

  dateText: {
    fontFamily: ThemeFonts.Medium,
    fontSize: 13,
    color: ThemeColors.description,
    textAlign: 'center',
  },
});

export default Calendar;
