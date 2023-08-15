import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},

  footer: {
    height: 20,
  },
});

const ListVertical = ({items = [], renderItem = null}) => {
  return (
    <FlatList
      data={items}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={(_, x) => `item-${x}`}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={styles.footer} />}
    />
  );
};

export default ListVertical;
