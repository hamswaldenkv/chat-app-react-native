import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThemeColors from '../../resources/color';
import ThemeStyle from '../../resources/style';
import AppStatusBar from '../../components/header/statusbar';
import Header from '../../components/header/light';
import ThemeFonts from '../../resources/font';
import LargeCarousel from '../../components/carousel/LargeCarousel';
import Profile from '../../components/profile/itemCarousel';
import Event from '../../components/event/item';
import ListVertical from '../../components/datalist/ListVertical';
import EventsManager from '../../util/EventUtil';

class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.fetchDataIfNeeded(), 500);
    EventsManager.getInstance()._emit('requestNotifications', null);
  }

  fetchDataIfNeeded() {
    const {getEvents} = this.props;
    // eslint-disable-next-line curly
    if (getEvents) getEvents();
  }

  onTopicSelected(slug) {}

  onRefresh = () => {
    this.setState({refreshing: true}, () => {
      this.fetchDataIfNeeded();
    });
    setTimeout(() => this.setState({refreshing: false}), 2000);
  };

  render() {
    const {loading, events} = this.props;
    const {refreshing} = this.state;
    return (
      <LinearGradient
        locations={[0, 0.5]}
        style={ThemeStyle.fill}
        colors={[ThemeColors.primary[700], ThemeColors.formBackground]}>
        <AppStatusBar />
        <Header
          title=""
          rightActions={[
            {
              iconName: 'settings-outline',
            },
          ]}
        />
        <ScrollView
          style={ThemeStyle.fill}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <View style={styles.viewHeader}>
            <Text style={styles.viewTitle}>Events</Text>
          </View>

          <ListVertical
            items={events}
            renderItem={({item}) => <Event {...item} />}
          />

          <View style={{minHeight: 20}}>
            {loading && (
              <ActivityIndicator color={ThemeColors.white} size={'large'} />
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  renderSectionItem(sectionItem) {
    const {list_type, view_type, items = []} = sectionItem;
    let ItemEvent = ({item, x}) => <Event {...item} />;
    let ItemProfile = ({item, x}) => <Profile {...item} onPress={() => {}} />;

    switch (view_type) {
      case 'EventList':
        return (
          <ListVertical
            items={items}
            list_type={list_type}
            renderItem={ItemEvent}
          />
        );
      case 'ProfileCarousel':
        return (
          <LargeCarousel
            items={items}
            list_type={list_type}
            renderItem={ItemProfile}
          />
        );

      default:
        break;
    }

    return null;
  }
}

const styles = StyleSheet.create({
  viewHeader: {
    padding: 20,
  },

  viewTitle: {
    fontSize: 16,
    color: ThemeColors.white,
    fontFamily: ThemeFonts.Bold,
  },
});

export default Tab1;
