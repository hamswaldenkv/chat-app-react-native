import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Ripple from '../touch/Ripple';
import ThemeColors from '../../resources/color';
import {ionIcon} from '../../resources/icon';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginBottom: 10,
  },

  footer: {
    width: 20,
  },

  topicRoot: {
    marginRight: 10,
  },

  topic: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: ThemeColors.transparent,
    backgroundColor: ThemeColors.dark[800],
  },

  topicSelected: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: ThemeColors.white,
    backgroundColor: ThemeColors.dark[800],
  },

  topicName: {
    color: ThemeColors.white,
  },
});

const Topic = ({title, selected, isMore}) => (
  <View style={styles.topicRoot}>
    <Ripple>
      <View style={selected ? styles.topicSelected : styles.topic}>
        <Text style={styles.topicName}>{title}</Text>
        {isMore && (
          <View style={{marginLeft: 4}}>
            {ionIcon('caret-down', 12, ThemeColors.white)}
          </View>
        )}
      </View>
    </Ripple>
  </View>
);

const TopicCarousel = ({items = [], selected}) => {
  return (
    <FlatList
      style={styles.container}
      data={items}
      horizontal
      keyExtractor={(_, x) => `item-${x}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <Topic {...item} selected={item.slug === selected} />
      )}
      ListFooterComponent={<View style={styles.footer} />}
    />
  );
};

export default TopicCarousel;
