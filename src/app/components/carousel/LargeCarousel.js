import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },

  footer: {
    width: 20,
  },
});

const LargeCarousel = ({items = [], renderItem = null}) => {
  return (
    <FlatList
      style={styles.container}
      data={items}
      horizontal
      renderItem={renderItem}
      keyExtractor={(_, x) => `item-${x}`}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={<View style={styles.footer} />}
    />
  );
};

export default LargeCarousel;
