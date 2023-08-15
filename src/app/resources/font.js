import {Platform} from 'react-native';

const ThemeFonts = {
  Heavy: Platform.OS === 'ios' ? 'CooperHewitt-Heavy' : 'CooperHewitt-Heavy',
  Bold: Platform.OS === 'ios' ? 'CooperHewitt-Bold' : 'CooperHewitt-Bold',
  Semibold:
    Platform.OS === 'ios' ? 'CooperHewitt-Semibold' : 'CooperHewitt-Semibold',
  Medium: Platform.OS === 'ios' ? 'CooperHewitt-Medium' : 'CooperHewitt-Medium',
  Book: Platform.OS === 'ios' ? 'CooperHewitt-Book' : 'CooperHewitt-Book',
  Light: Platform.OS === 'ios' ? 'CooperHewitt-Light' : 'CooperHewitt-Light',
  Thin: Platform.OS === 'ios' ? 'CooperHewitt-Thin' : 'CooperHewitt-Thin',
};

export default ThemeFonts;
