import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { width, height } = Dimensions.get('window');

import WebView from 'react-native-webview';

export default function WebViewModal(props) {
  return (
    <View>
      <Modal
        animationType='none'
        transparent={true}
        visible={props.visible}>
        <View style={styles.modalView}>
          <TouchableOpacity
            blurRadius={10}
            activeOpacity={0.9}
            onPress={props.closeModal}
            style={styles.closedButton}>
            <View style={styles.bar} />
          </TouchableOpacity>
          <WebView style={styles.webViewArea} source={{ uri: props.url }} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor:'blue'
  },
  webViewArea: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  closedButton: {
    width: width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(227, 242, 253, 0.8)',
  },
  bar: {
    borderRadius: 50,
    height: 9,
    width: 125,
    marginBottom:2,
    elevation: 10,
    backgroundColor: 'white',
  },
});
