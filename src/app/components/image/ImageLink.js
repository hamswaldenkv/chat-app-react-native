import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import ThemeStyle from '../../resources/style';

const DEFAULT_COVER = require('../../../assets/images/cover-intro-05.jpeg');

const urlToURI = url => {
  return {uri: url};
};

const ImageLink = ({image}) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={image ? urlToURI(image) : DEFAULT_COVER}
          style={ThemeStyle.imageFill}
        />
        <Text>ImageLink</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {marginRight: 10},

  container: {
    overflow: 'hidden',
    backgroundColor: '#2c3e50',
    borderRadius: 4,
    height: 140,
    width: Dimensions.get('window').width * 0.7,
  },
});

export default ImageLink;
