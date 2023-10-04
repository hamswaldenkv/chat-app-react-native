/* eslint-disable curly */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  Platform,
  PermissionsAndroid,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ThemeColors from '../../resources/color';
import Ripple from '../touch/Ripple';
import ProgressBar from '../progress/progressBar';
import {ionIcon, materialIcon} from '../../resources/icon';
import {assetUpload} from '../../api/userService';
import ThemeStyle from '../../resources/style';

const options = {
  quality: 0.7,
  title: 'Image',
  takePhotoButtonTitle: 'Prendre un photo',
  cancelButtonTitle: 'Annuler',
  storageOptions: {skipBackup: true, path: 'my_chat__photos'},
};

const MessageEditor = ({sendMessage, threadId, loadingSend}) => {
  const [content, setContent] = useState('');
  const [kind, setKind] = useState('text');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSendMessage = () => {
    if (loadingSend) return;
    if (content === '' && kind === 'text') return;

    let bodyRequest = {
      kind,
      content,
      thread_id: threadId,
      photo_url: photoUrl,
    };
    if (sendMessage) sendMessage(bodyRequest);
    setTimeout(() => {
      setContent('');
      setKind('text');
      setPhotoUrl(null);
    }, 500);
  };

  const onRequestCamera = async () => {
    launchCamera(options, async response => {
      console.log('launchCamera:', response);
      const {assets} = response;
      if (!assets || Array.from(assets).length === 0) return;

      const [firstPicked] = assets;
      const {fileName, fileSize, uri, type, width, height} = firstPicked;

      try {
        let formData = new FormData();
        formData.append('file', {uri, type, name: fileName});

        setLoading(true);
        let {data} = await assetUpload(formData);
        console.log('uploadResponse:', data);

        const {asset} = data;
        if (!asset) throw new Error('no asset found');

        setKind('photo');
        setPhotoUrl(asset.url);
        setContent('Photo');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('uploadResponse: [error]', error);
      }
    });
  };

  const onRequestGallery = async () => {
    launchImageLibrary(options, async response => {
      console.log('launchImageLibrary:', response);
      const {assets} = response;
      if (!assets || Array.from(assets).length === 0) return;

      const [firstPicked] = assets;
      const {fileName, fileSize, uri, type, width, height} = firstPicked;

      try {
        let formData = new FormData();
        formData.append('file', {uri, type, name: fileName});

        setLoading(true);
        let {data} = await assetUpload(formData);
        console.log('uploadResponse:', data);

        const {asset} = data;
        if (!asset) throw new Error('no asset found');

        setKind('photo');
        setPhotoUrl(asset.url);
        setContent('Photo');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('uploadResponse: [error]', error);
      }
    });
  };

  const requestPermission = async () => {
    if (Platform.OS !== 'android') return;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermission();
    return () => {};
  }, []);

  return (
    <>
      {loading && <ProgressBar indeterminate={true} />}

      {photoUrl && (
        <View
          style={[
            ThemeStyle.absoluteBottom,
            {marginBottom: 60, paddingHorizontal: 40, flexDirection: 'row'},
          ]}>
          <Ripple onPress={() => setPhotoUrl(null)}>
            <View style={{padding: 10, backgroundColor: ThemeColors.white}}>
              {ionIcon('close', 15)}
            </View>
          </Ripple>
          <View
            style={{
              height: 200,
              width: 150,
              borderColor: ThemeColors.primary[400],
              backgroundColor: ThemeColors.white,
              borderWidth: 2,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: photoUrl}}
              style={ThemeStyle.imageFill}
              resizeMode="cover"
            />
          </View>
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.editor}>
          <TextInput
            multiline
            editable={!loadingSend}
            value={content}
            style={styles.textInput}
            placeholder="Taper votre message"
            returnKeyLabel="Envoyer"
            returnKeyType="send"
            placeholderTextColor={ThemeColors.textPlaceholder}
            onChangeText={text => setContent(text)}
          />
          <Ripple onPress={() => onRequestGallery()}>
            <View style={styles.button}>{ionIcon('image-outline', 20)}</View>
          </Ripple>
          <Ripple onPress={() => onRequestCamera()}>
            <View style={styles.button}>{ionIcon('camera-outline', 20)}</View>
          </Ripple>
        </View>
        <Ripple onPress={() => onSendMessage()}>
          <View style={styles.button}>
            {!loadingSend && materialIcon('send', 25, ThemeColors.title)}
            {loadingSend && <ActivityIndicator />}
          </View>
        </Ripple>
      </View>
    </>
  );
};

export default MessageEditor;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    padding: 20,
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editor: {
    flex: 1,
    backgroundColor: ThemeColors.white,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    color: ThemeColors.title,
    textAlignVertical: 'top',
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: 15,
  },
});
