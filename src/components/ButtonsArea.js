import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

//imported components
import SmallAlert from './SmallAlert';
import WebViewModal from './WebViewModal';

const { width, height } = Dimensions.get('window');

const ButtonsArea = (props) => {
  const animCopy = React.useRef(null);

  const animSave = React.useRef(null);
  const animShare = React.useRef(null);
  const animOpen = React.useRef(null);

  //imported Components State
  const [openedUrl, setOpenedUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertStatus, SetAlertStatus] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [copiedText, setCopiedText] = React.useState('');
  const [pressedCopy, setPressedCopy] = React.useState(false);
  const [pressedSave, setPressedSave] = React.useState(false);
  const [savedStatus, SetSavedStatus] = React.useState(false);

  const [pressedOpen, setPressedOpen] = React.useState(false);
  const [pressedShare, setPressedShare] = React.useState(false);

  //Copy->
  const Func_Copy = (text) => {
    setPressedCopy(true);
    SetAlertStatus(true);
    setAlertText('Panoya Kopyalandı');
    Clipboard.setString(text);
    setTimeout(() => {
      setPressedCopy(false);
    }, 500);

    setTimeout(() => {
      SetAlertStatus(false);
    }, 1500);
  };
  useEffect(() => {
    if (pressedCopy === false) {
      animCopy.current.play(42, 42);
      return () => animCopy.current.reset(null);
    } else {
      animCopy.current.play(42, 45);

      return () => animCopy.current.reset(null);
    }
  }, [pressedCopy]);
  //Copy//

  //Open->
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
  useEffect(() => {
    if (pressedOpen === false) {
      animOpen.current.play(55, 55);
      return () => animOpen.current.reset(null);
    } else {
      animOpen.current.play(55, 100);
      return () => animOpen.current.reset(null);
    }
  }, [pressedOpen]);
  //Open//

  //Share->
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
  useEffect(() => {
    if (pressedShare === false) {
      animShare.current.play(39, 39);
      return () => animShare.current.reset(null);
    } else {
      animShare.current.play(93, 109);
      return () => animShare.current.reset(null);
    }
  }, [pressedShare]);
  //Share//

  //Save->
  const Func_SaveOrDelete = async (savedItem) => {
    const setAlertSettings = (message) => {
      SetAlertStatus(true);
      setAlertText(message);
      setTimeout(() => {
        SetAlertStatus(false);
      }, 1000);
    };

    if (savedStatus === false) {
      setPressedSave(true);
      setTimeout(() => {
        setPressedSave(false);
      }, 1000);

      var asyncData = await AsyncStorage.getItem('@SavedNews');
      if (asyncData === null) {
        var data = [];
        await data.push(savedItem);
        await AsyncStorage.setItem('@SavedNews', JSON.stringify(data));
      } else {
        var data = JSON.parse(asyncData);

        if (data.find((x) => x.url === savedItem.url) === undefined) {
          await data.push(savedItem);
          await AsyncStorage.removeItem('@SavedNews');
          await AsyncStorage.setItem('@SavedNews', JSON.stringify(data));
          //setAlertText('Haber Kaydedildi');
          setAlertSettings('Haber Kaydedildi');
        } else {
          setAlertSettings('Haber Kaydedilmedi');
        }
      }
    } else {
      var asyncData = await AsyncStorage.getItem('@SavedNews');
      var data = JSON.parse(asyncData);
      if (data.find((x) => x.url == savedItem.url)) {
        data.splice(
          data.findIndex((x) => x.url == savedItem.url),
          1
        );
        await AsyncStorage.removeItem('@SavedNews');

        await AsyncStorage.setItem('@SavedNews', JSON.stringify(data));

        setAlertSettings('Haber Kaldırıldı');
        checkSavedorNot();
      }
    }
  };

  const checkSavedorNot = async (ActiveUrl) => {
    var asyncData = await AsyncStorage.getItem('@SavedNews');
    if (asyncData === null) {
      SetSavedStatus(false);
    } else {
      var data = [];

      var data = JSON.parse(asyncData);

      if (data.find((x) => x.url === ActiveUrl) !== undefined) {
        SetSavedStatus(true);
      } else {
        SetSavedStatus(false);
      }
    }
  };

  useEffect(() => {
    checkSavedorNot(props.ActiveItem);
    if (savedStatus === false) {
      animSave.current?.play(0, 0);
      return () => animSave.current.reset(null);
    } else {
      animSave.current?.play(0, 90);
      return () => animSave.current.reset(null);
    }
  }, [pressedSave, savedStatus]);

  //GoSavedNews//

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
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.goPage}
          onLongPress={() => Func_SaveOrDelete(props.index)}
          style={styles.buttonArea}>
          <View style={styles.button}>
            <LottieView
              ref={animSave}
              style={{ width: 45, height: 45 }}
              source={require('../../assets/Lottie/saveLottie.json')}
              autoPlay={false}
              loop={false}
              speed={2}
            />
          </View>
          <Text style={styles.text}>
            {savedStatus == true ? 'Aç / Kaldır' : 'Aç / Kaydet'}
          </Text>
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
      <View >
        <WebViewModal
          url={openedUrl}
          visible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />
        <SmallAlert status={alertStatus} AlertText={alertText} />
      </View>
    </View>
  );
};

export default ButtonsArea;

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
