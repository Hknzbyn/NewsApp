import React, { useState, useEffect, useRef } from 'react';
import {
  Share,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';

import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';

import * as Clipboard from 'expo-clipboard';
import LottieView from 'lottie-react-native';

//imported components
import SmallAlert from './SmallAlert';
import WebViewModal from './WebViewModal';

const { width, height } = Dimensions.get('window');

export default function ButtonsArea(props) {
  const animCopy = React.useRef(null);

  const animSave = React.useRef(null);
  const animShare = React.useRef(null);
  const animOpen = React.useRef(null);

  //imported Components State
  const [openedUrl, setOpenedUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [coppiedAlert, setCoppiedAlert] = useState(false);

  const [copiedText, setCopiedText] = React.useState('');
  const [pressedCopy, setPressedCopy] = React.useState(false);
  const [pressedSave, setPressedSave] = React.useState(false);
  const [pressedLongSave, setPressedLongSave] = React.useState(false);
  const [pressedOpen, setPressedOpen] = React.useState(false);
  const [pressedShare, setPressedShare] = React.useState(false);

  useEffect(() => {
    //console.log('pressedCopy ' + pressedCopy);
    if (pressedSave === false) {
      animSave.current.play(90, 90);
      return () => animSave.current.reset(null);
    } else {
      animSave.current.play(90, 0);
      return () => animSave.current.reset(null);
    }
  });

  useEffect(() => {
    if (pressedShare === false) {
      animShare.current.play(39, 39);
      return () => animShare.current.reset(null);
    } else {
      animShare.current.play(93, 109);
      return () => animShare.current.reset(null);
    }
  });

  useEffect(() => {
    if (pressedOpen === false) {
      animOpen.current.play(55, 55);
      return () => animOpen.current.reset(null);
    } else {
      animOpen.current.play(55, 100);
      return () => animOpen.current.reset(null);
    }
  });

  useEffect(() => {
    if (pressedCopy === false) {
      animCopy.current.play(42, 42);
      return () => animCopy.current.reset(null);
    } else {
      animCopy.current.play(42, 45);

      return () => animCopy.current.reset(null);
    }
  }, [pressedCopy]);

  //+
  const Func_Copy = (text) => {
    setPressedCopy(true);

    //const text = Clipboard.getStringAsync();
    Clipboard.setString(text);
    //Alert.alert('Coppiedtext ' + text);
    setTimeout(() => {
      setPressedCopy(false);
    }, 500);
    //setCoppiedAlert(true);
  };

  //Todo
  const Func_Save = () => {
    props.saveAction;
    setPressedSave(true);
    setTimeout(() => {
      setPressedSave(false);
    }, 2000);
  };

  //+
  const Func_Share = async (url) => {
    setPressedShare(true);
    setTimeout(() => {
      setPressedShare(false);
    }, 2000);

    try {
      const result =
        Platform.OS === 'android'
          ? await Share.share({
              message: url,
            })
          : await Share.share({
              url: url,
            });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          Alert.alert('ok');
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //+
  const Func_Open = (url) => {
    setOpenedUrl(url);

    setPressedOpen(true);
    setTimeout(() => {
      setPressedOpen(false);
    }, 2000);

    setTimeout(() => {
      setModalVisible(true);
    }, 400);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'gray',
      }}>
      <View style={styles.actionsArea}>
        <TouchableOpacity
          onPress={() => Func_Copy(props.copyAction)}
          style={styles.buttonArea}>
          <View style={styles.button}>
            <LottieView
              ref={animCopy}
              style={{ width: 45, height: 45 }}
              source={require('../../assets/Lottie/copyLottie.json')}
              autoPlay={false}
              loop={false}
              speed={1.15}
            />
          </View>
          <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
            Kopyala
          </Text>
          <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
            {pressedCopy === false ? 'false' : 'true'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.navigate}
          onLongPress={props.save}
          style={styles.buttonArea}>
          <View style={styles.button}>
            <LottieView
              ref={animSave}
              style={{ width: 45, height: 45 }}
              source={require('../../assets/Lottie/saveLottie.json')}
              autoPlay={false}
              loop={false}
              speed={1.15}
            />
          </View>
          <Text style={styles.text}>Kaydet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonArea}
          onPress={() => Func_Open(props.openAction)}>
          <View style={styles.button}>
            <LottieView
              ref={animOpen}
              style={{ width: 45, height: 45 }}
              source={require('../../assets/Lottie/openLottie.json')}
              autoPlay={false}
              loop={false}
              speed={3}
            />
          </View>
          <Text style={styles.text}>Haberi Aç</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonArea}
          onPress={() => Func_Share(props.shareAction)}>
          <View style={styles.button}>
            <LottieView
              ref={animShare}
              style={{ width: 100, height: 100 }}
              source={require('../../assets/Lottie/shareLottie.json')}
              autoPlay={false}
              loop={false}
              speed={1.5}
            />
          </View>

          <Text style={styles.text}>Paylaş</Text>
        </TouchableOpacity>
      </View>
      <View>
        <WebViewModal
          url={openedUrl}
          visible={modalVisible}
          pressOut={() => setModalVisible(false)}
          closeModal={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 2,
    alignItems: 'flex-start',
    width: width,
    height: height * 0.1,
    backgroundColor: '#181D31', //#181D31
  },
  buttonArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});
