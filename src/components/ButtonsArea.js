import React, { useState } from 'react';
import {
  Share,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';

import * as Clipboard from 'expo-clipboard';

const { width, height } = Dimensions.get('window');

export default function ButtonsArea(props) {
  const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const onShare = async (sharedMessage) => {
    //console.log(sharedUrl+ '_sharedUrl')
    try {
      const result = await Share.share({
        //message: sharedMessage,
        url: { uri: sharedMessage },
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          Alert.alert('ok');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.actionsArea}>
      <TouchableOpacity onPress={props.copyAction} style={styles.buttonArea}>
        <MaterialCommunityIcons name='content-copy' size={30} color='white' />
        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
          Kopyala
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.saveAction}
        onLongPress={props.onLongPress}
        style={styles.buttonArea}>
        <MaterialCommunityIcons
          name='bookmark-multiple'
          size={30}
          color='white'
        />
        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
          Kaydet
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonArea} onPress={props.openAction}>
        <Ionicons name='open' size={30} color='white' />
        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
          Haberi Aç
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonArea}
        onPress={props.shareAction}>
        <MaterialCommunityIcons name='share' size={30} color='white' />
        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
          Paylaş
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 5,
    alignItems: 'center',
    width: width,
    height: height * 0.08,
    //maxHeight: height - 2 * width,
    backgroundColor: '#181D31',
  },
  buttonArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
