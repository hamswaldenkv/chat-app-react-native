/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {TouchView} from '../../helpers';
import {ionIcon} from '../../resources/icons';
import ThemeColors from '../../resources/colors';
import ThemeFonts from '../../resources/fonts';

const BottomSheetHeader = ({title = 'title', onRequestClose = null}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: ThemeColors.borderColor,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchView onPress={onRequestClose}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: ThemeColors.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {ionIcon('close-outline', 20, ThemeColors.title)}
        </View>
      </TouchView>
      <Text
        style={{
          marginLeft: 20,
          fontSize: 15,
          fontFamily: ThemeFonts.GTWalsheimProBold,
          color: ThemeColors.title,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default BottomSheetHeader;
