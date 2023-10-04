import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AppStatusBar from '../../components/header/statusbar';
import ThemeColors from '../../resources/color';
import ThemeStyle from '../../resources/style';
import ThemeFonts from '../../resources/font';
import Ripple from '../../components/touch/Ripple';
import Header from '../../components/header/light';
import AvatarProfile from '../../components/avatar/profile';
import {urlToURI} from '../../util/Utils';
import {ionIcon} from '../../resources/icon';
import Calendar from '../../components/calendar/minimal';
import Button from '../../components/button/Button';
import moment from 'moment';
import BottomSheet from '../../components/BottomSheet';

const DEFAULT_COVER = require('../../../assets/images/cover-intro-05.jpeg');

class EventPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalParticipantVisible: false,
      selectedParticipant: null,
    };
  }

  onSelectParticipant(participant) {
    Actions.chat({
      kind: 'private',
      user_id: participant.id,
    });
  }

  onRequestParticipation() {
    const {event, joinEvent} = this.props;
    const {id: eventId} = event;
    Alert.alert(
      'Confirmer',
      'Voulez-vous confirmer votre participation à cet évènement ?',
      [
        {
          text: 'Confirmer',
          onPress: () => {
            // eslint-disable-next-line curly
            if (joinEvent) joinEvent(eventId);
          },
        },
        {
          text: 'Fermer',
        },
      ],
    );
  }

  render() {
    const {selectedParticipant, modalParticipantVisible} = this.state;
    const {event, buttonLoading} = this.props;
    const {
      photo_url,
      title,
      description,
      count_participants,
      venue_place,
      venue_address,
      start_at,
      finish_at,
      participants = [],
    } = event;
    return (
      <View style={ThemeStyle.fill}>
        <AppStatusBar />
        <View style={{backgroundColor: ThemeColors.primary[500]}}>
          <Header
            title="Evènement"
            rightActions={[
              {
                iconName: 'ellipsis-vertical-outline',
                onPress: () => {},
              },
            ]}
            leftActions={[
              {
                iconName: 'chevron-back-outline',
                onPress: () => Actions.pop(),
              },
            ]}
          />
        </View>
        <View style={ThemeStyle.fill}>
          <ScrollView style={ThemeStyle.fill}>
            <View style={styles.image}>
              <Image
                resizeMode="cover"
                style={ThemeStyle.imageFill}
                source={photo_url ? urlToURI(photo_url) : DEFAULT_COVER}
              />
              <View style={[ThemeStyle.absoluteBottomRight, {padding: 20}]}>
                <Calendar date={start_at} />
              </View>
            </View>
            <View style={styles.header}>
              <Text style={styles.pageTitle}>{title}</Text>
              <Text style={styles.pageDescription}>
                {count_participants} participant(s)
              </Text>

              <View style={styles.buttons}>
                <View style={[ThemeStyle.fill, {paddingRight: 5}]}>
                  <Ripple
                    onPress={() =>
                      Actions.chat({
                        kind: 'group',
                        event_id: event.id,
                      })
                    }>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Chatter</Text>
                      {ionIcon(
                        'chatbubble-ellipses-outline',
                        15,
                        ThemeColors.title,
                      )}
                    </View>
                  </Ripple>
                </View>
                <View style={[ThemeStyle.fill, {paddingLeft: 5}]}>
                  <Ripple>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Partager</Text>
                      {ionIcon('share-outline', 15, ThemeColors.title)}
                    </View>
                  </Ripple>
                </View>
              </View>

              <View style={styles.infoContainer}>
                {ionIcon('calendar-outline', 15, ThemeColors.dark[800])}
                <View style={styles.infoContainerFill}>
                  <Text style={styles.infoContainerTitle}>
                    {moment(start_at).format('DD MMM YYYY, HH:mm')}
                    {finish_at &&
                      ` - ${moment(finish_at).format('DD MMM YYYY, HH:mm')}`}
                  </Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                {ionIcon('location-outline', 15, ThemeColors.dark[800])}
                <View style={styles.infoContainerFill}>
                  <Text style={styles.infoContainerTitle}>{venue_place}</Text>
                  <Text>{venue_address}</Text>
                </View>
              </View>
            </View>

            <FlatList
              horizontal
              data={participants}
              style={{paddingLeft: 50}}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, x) => `profile-${x}`}
              ListFooterComponent={<View style={{width: 50}} />}
              renderItem={({item}) => (
                <AvatarProfile
                  title={item.first_name}
                  hideName={false}
                  onPress={() => {
                    this.onSelectParticipant(item);
                  }}
                />
              )}
            />
            <View style={{padding: 20, paddingLeft: 60}}>
              <Text style={styles.pageDescription}>
                {count_participants} Participant(s)
              </Text>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <Button
                isDisabled={buttonLoading}
                isLoading={buttonLoading}
                style={ThemeStyle.buttonPrimary}
                textStyle={ThemeStyle.buttonPrimaryText}
                onPress={() => this.onRequestParticipation()}>
                Participer
              </Button>
            </View>
          </ScrollView>
        </View>

        {selectedParticipant && (
          <>
            {modalParticipantVisible && (
              <BottomSheet
                height={400}
                onClose={() => {
                  this.setState({modalParticipantVisible: false});
                }}>
                <View
                  style={{
                    margin: 20,
                    height: 300,
                    backgroundColor: ThemeColors.white,
                  }}></View>
              </BottomSheet>
            )}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  image: {
    height: 180,
    backgroundColor: ThemeColors.dark[500],
    overflow: 'hidden',
  },

  pageTitle: {
    fontSize: 20,
    lineHeight: 22,
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Bold,
  },

  pageDescription: {
    fontSize: 12,
    color: ThemeColors.description,
    fontFamily: ThemeFonts.Medium,
  },

  buttons: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infoContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoContainerFill: {
    paddingLeft: 20,
    flex: 1,
  },

  infoContainerTitle: {
    fontSize: 12,
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Semibold,
  },

  infoContainerText: {
    fontSize: 12,
    color: ThemeColors.description,
    fontFamily: ThemeFonts.Medium,
  },

  buttonsText: {
    fontSize: 12,
    color: ThemeColors.description,
    fontFamily: ThemeFonts.Medium,
  },

  button: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderColor: ThemeColors.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 12,
    color: ThemeColors.title,
    fontFamily: ThemeFonts.Medium,
    marginRight: 5,
  },

  playButton: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: ThemeColors.white,
  },
});

export default EventPage;
