import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import Message from '../message/item';

const ChatList = ({
  messages = [],
  refreshing = false,
  onRefresh,
  ListHeaderComponent,
  currentUserId,
}) => {
  return (
    <FlatList
      data={messages}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={true}
      keyExtractor={(_, x) => `message-${x}`}
      renderItem={({item}) => (
        <Message {...item} currentUserId={currentUserId} />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ChatList;
