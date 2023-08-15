/* eslint-disable curly */
import React, {Component} from 'react';
import {FlatList, Image, RefreshControl, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ThemeStyle from '../../resources/style';
import ThemeColors from '../../resources/color';
import Header from '../../components/header/light';
import MessageEditor from '../../components/editor';
import EventsManager from '../../util/EventUtil';
import Message from '../../components/message/item';
import ProgressBar from '../../components/progress/progressBar';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threadId: null,
      isRefreshing: false,
      lastMessageId: null,
    };
  }

  componentDidMount() {
    EventsManager.getInstance().on('onThreadCreated', this.onThreadCreated);

    const {kind, thread_id, event_id, user_id, createChat} = this.props;
    if (thread_id != null) {
      this.fetchMessages(thread_id);
    } else {
      if (createChat) createChat({kind, user_id, event_id});
    }
  }

  componentWillUnmount() {
    EventsManager.getInstance().off('onThreadCreated', this.onThreadCreated);
  }

  componentDidUpdate(prevProps, prevState) {
    const {thread_id, lastMessageId} = this.props;
    if (prevState.threadId !== thread_id) {
      this.setState({threadId: thread_id}, () => {
        this.fetchMessages(thread_id);
      });
    }
    if (prevState.lastMessageId !== lastMessageId) {
      this.setState({lastMessageId}, () => {
        this.flatList.scrollToEnd({animated: true});
      });
    }
  }

  onThreadCreated = thread_id => {
    const {kind, event_id, user_id} = this.props;
    Actions.refresh({thread_id, kind, event_id, user_id});
  };

  onRefreshThread = () => {
    const {thread_id} = this.props;
    this.setState({isRefreshing: true}, () => {
      this.fetchMessages(thread_id);
    });
    setTimeout(() => this.setState({isRefreshing: false}), 2000);
  };

  fetchMessages(thread_id) {
    const {getMessages} = this.props;
    if (getMessages) getMessages({thread_id});
  }

  render() {
    const {isRefreshing} = this.state;
    const {
      sendMessage,
      thread_id,
      messages,
      loading,
      loadingSend,
      loadingCreate,
      currentUserId,
    } = this.props;
    return (
      <View style={ThemeStyle.fillWhite}>
        <View style={{backgroundColor: ThemeColors.primary[700]}}>
          <Header
            leftActions={[
              {
                iconName: 'chevron-back-outline',
                onPress: () => Actions.pop(),
              },
            ]}
            rightActions={[
              {
                iconName: 'ellipsis-vertical-outline',
                onPress: () => {},
              },
            ]}
            title={'Discussion'}
          />
        </View>
        {loading && (
          <ProgressBar indeterminate={true} color={ThemeColors.greenColor} />
        )}
        {loadingCreate && (
          <ProgressBar indeterminate={true} color={ThemeColors.greenColor} />
        )}
        <View style={ThemeStyle.fill}>
          <Image
            source={require('../../../assets/images/cover-chat-02.png')}
            style={ThemeStyle.imageFill}
            resizeMode="cover"
          />
          <View style={ThemeStyle.absolute}>
            <FlatList
              ref={ref => (this.flatList = ref)}
              data={messages}
              showsVerticalScrollIndicator={true}
              keyExtractor={(_, x) => `message-${x}`}
              renderItem={({item}) => (
                <Message {...item} currentUserId={currentUserId} />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={this.onRefreshThread}
                />
              }
            />
            <MessageEditor
              threadId={thread_id}
              loadingSend={loadingSend}
              sendMessage={sendMessage}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ChatPage;
