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

import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import WebView from 'react-native-webview';

export default function WebViewModal(props) {
  //const [webModalVisible, setWebModalVisible] = useState(false);
  //console.log(`props.url`, props.url);
  return (
    <View>
      <Modal
        swipeToClose={true}
        swipeArea={5} // The height in pixels of the swipeable area, window height by default
        swipeThreshold={200} // The threshold to reach in pixels to close the modal
        animationType='none'
        transparent={true}
        visible={props.visible}
        onPressOut={props.pressOut}
        //onRequestClose={}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={props.closeModal}
              style={styles.closedButton}>
              <MaterialCommunityIcons name='close' size={40} color='white' />
            </TouchableOpacity>
            <WebView style={styles.webViewArea} source={{ uri: props.url }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    //margin: 20,
    //backgroundColor: 'red',
    //borderRadius: 10,
    height: height,
    width: width,
    alignItems: 'center',
    // shadowColor: '#fff',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    //elevation: 5,
  },
  webViewArea: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  closedButton: {
    //activeOpacity: 0.2,
    //paddingBottom: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(101, 101, 101, 0.5)',
  },
});
