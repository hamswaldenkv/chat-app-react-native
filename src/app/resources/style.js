import {StyleSheet} from 'react-native';
import ThemeFonts from './font';
import ThemeColors from './color';

const ThemeStyle = StyleSheet.create({
  fill: {
    flex: 1,
  },
  fillPrimary: {
    flex: 1,
    backgroundColor: ThemeColors.primary,
  },
  fillSecondary: {
    flex: 1,
    backgroundColor: ThemeColors.secondary,
  },
  fillWhite: {
    flex: 1,
    backgroundColor: ThemeColors.white,
  },
  fillDark: {
    flex: 1,
    backgroundColor: ThemeColors.primaryDark,
  },

  fillEmpty: {
    flex: 1,
    backgroundColor: ThemeColors.empty,
  },

  fillEmpty2: {
    flex: 1,
    backgroundColor: ThemeColors.empty2,
  },

  absolute: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  absoluteTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },

  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  absoluteTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },

  absoluteBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  absoluteBottomLeft: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    left: 0,
    right: 0,
  },

  overlay: {
    backgroundColor: '#12111580',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  overlayTop: {
    backgroundColor: '#12111568',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    elevation: 5,
  },

  overlayPrimary: {
    backgroundColor: '#d7383280',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  overlaySecondary: {
    backgroundColor: '#12111568',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  row: {
    flexDirection: 'row',
  },

  rowCenterBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /**
   * IMAGES (CONTAINER & VIEW)
   */
  imageFillContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'center',
  },

  imageContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'center',
  },

  imageFill: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },

  /**
   * Buttons
   */

  buttonPrimary: {
    height: 55,
    borderRadius: 30,
    backgroundColor: ThemeColors.primary[500],
    borderColor: ThemeColors.transparent,
    borderWidth: 0,
  },

  buttonWhite: {
    height: 55,
    borderRadius: 30,
    backgroundColor: ThemeColors.white,
    borderColor: ThemeColors.transparent,
    borderWidth: 0,
  },

  buttonOutline: {
    height: 55,
    borderRadius: 30,
    backgroundColor: ThemeColors.transparent,
    borderColor: ThemeColors.primary[500],
    borderWidth: 1,
  },

  buttonPrimaryText: {
    fontSize: 13,
    fontFamily: ThemeFonts.Bold,
    color: ThemeColors.white,
  },
  buttonWhiteText: {
    fontSize: 13,
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Bold,
  },
  buttonOutlineText: {
    fontSize: 13,
    fontFamily: ThemeFonts.Bold,
    color: ThemeColors.primary[500],
  },

  /**
   * Forms
   */

  formGroup: {
    borderRadius: 4,
    borderColor: ThemeColors.borderColor,
    borderWidth: 0.7,
    paddingHorizontal: 20,
    marginVertical: 7.5,
  },

  textInput: {
    fontFamily: ThemeFonts.Medium,
    color: ThemeColors.title,
    fontSize: 13,
    height: 50,
  },

  textInputDark: {
    fontFamily: ThemeFonts.Medium,
    color: ThemeColors.white,
    fontSize: 13,
    height: 50,
  },
});

export default ThemeStyle;
