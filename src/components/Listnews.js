import React, { useEffect, useState, useRef } from 'react';
import {
  Share,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  Alert,
  ScrollViewComponent,
  ScrollView,
  Ani,
  Animated,
  ToastAndroid,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';
import WebViewModal from '../components/WebViewModal';

import axios from 'axios';

let auth = `apikey 0HF7FRUZ89Te0ngjoWlGnf:3PVY7jkQyDpKOErpLjFhnf`; //auth key
let urlBase = `https://api.collectapi.com/news/getNews?country=tr&tag=general`; //api url
//let axios = require(`axios`);

import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import ButtonsArea from './ButtonsArea';
import * as Clipboard from 'expo-clipboard';
import SmallAlert from './SmallAlert';

export default function Listnews(props) {
  // const index = useRef(0);
  // const position = useRef(Animated.divide(scrollX, width)).current;
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [image, setImage] = useState('');
  // const [source, setSource] = useState('');
  // const [url, setUrl] = useState('');

  const [news, setNews] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [copiedText, setCopiedText] = React.useState('');
  const [coppiedAlert, setCoppiedAlert] = useState(false);
  const [openedUrl, setOpenedUrl] = useState('');
  const [sharedUrl, setSharedUrl] = useState('');

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (coppiedAlert === true) {
      setTimeout(() => {
        setCoppiedAlert(false);
      }, 1500);

      return () => setCoppiedAlert(false);
    }
  }, [coppiedAlert]);

  const copyText = (text) => {
    Clipboard.setString(text);
    setCoppiedAlert(true);
  };

  useEffect(() => {
    getData();
  }, [sharedUrl]);

  const onShare = async () => {
    //setSharedUrl(item.url)
    console.log('sharedUrl_ ' + sharedUrl);
    try {
      const result = await Share.share({
        //message: sharedMessage,
        url: sharedUrl,
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

  const getData = async () => {
    const item = await axios({
      method: 'get',
      url: urlBase,
      headers: {
        Authorization: auth,
      },
    })
      .then((item) => item.data.result)
      .then((item) => {
        setNews(item);
        //console.log(item.url)
        //console.log(item);
        //setTitle(item.name);
        // setDescription(user.description);
        // setSource(user.source);
        // setUrl(user.url);
        // setImage(user.image);
      });
  };

  const topRef = React.useRef();

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      //offset : index*width,
      //animated: true
    });
  };

  const renderNewsItems = ({ item, key }) => {
    //console.log('itemkey..' +item.key )
    //console.log('lenght' + news.length);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.newAreaContainer}
          onPress={() => setModalVisible(!modalVisible)}>
          <ImageBackground
            style={{
              resizeMode: 'cover',
              opacity: 0.8,
            }}
            source={{ uri: item.image }}>
            <View
              style={{
                height: width,
                width: width,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: height * 0.2,
                  //width: 200,
                  //backgroundColor: 'green',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View style={styles.sourceArea}>
                  <Text style={styles.sourceText}>{item.source}</Text>
                </View>
              </View>

              <View style={styles.arrowArea}>
                <Pressable
                  onPress={() => Alert.alert('LEFT_todo')}
                  style={styles.arrow}>
                  <AntDesign name='left' size={35} color='white' />
                </Pressable>

                <Pressable
                  onPress={() => Alert.alert('Right_todo')}
                  style={styles.arrow}>
                  <AntDesign name='right' size={35} color='white' />
                </Pressable>
              </View>

              <View
                style={{
                  maxWidth: width * 0.99,
                  height: height * 0.2,
                  justifyContent: 'flex-end',
                }}>
                <View style={styles.newTitleArea}>
                  <Text style={styles.titleText}>{item.name}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <ButtonsArea
          copyAction={() => copyText(item.url)}
          saveAction={() => Alert.alert('onPress')}
          onLongPress={() => Alert.alert('onlongPress')}
          openAction={() => {
            setOpenedUrl(item.url);
            setModalVisible(true);
          }}
          shareAction={() => {
            setSharedUrl(item.url);
            onShare(sharedUrl);
          }}
        />

        <View style={styles.newDescprictionArea}>
          <ScrollView style={styles.scrollArea}>
            <Text selectable={true} style={styles.descText}>
              {item.description}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerView}>
      <StatusBar backgroundColor='#181D31' style='light' />

      <Animated.FlatList
        ref={topRef}
        data={news}
        keyExtractor={(item) => item.key}
        renderItem={renderNewsItems}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // onMomentumScrollEnd={(ev) => {
        //   scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        // }}
      />

      <WebViewModal
        url={openedUrl}
        visible={modalVisible}
        pressOut={() => setModalVisible(false)}
        closeModal={() => setModalVisible(false)}
      />
      <SmallAlert status={coppiedAlert} AlertText={'Panoya Kopyalandı'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#181D31',
  },
  containerView: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181D31',
  },
  newAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: width,
    width: width,
    backgroundColor: '#181D31',
  },
  arrowArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    //backgroundColor:'red'
  },
  arrow: {
    backgroundColor: '#333333',
    opacity: 0.5,

    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceArea: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    height: 25,
    width: height * 0.16,
    backgroundColor: '#678983',
  },
  sourceText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  newImageArea: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width,
    width: width,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#F0E9D2',
    //backgroundColor: 'purple',
  },
  newDescprictionAreaGenerator: {
    height: width,
    width: width,
    backgroundColor: 'yellow',
  },
  newDescprictionArea: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    maxHeight: width,
    //maxHeight:width-height-1,
    width: width * 0.98,
    maxWidth: width * 0.99,
    //backgroundColor: 'green',
  },
  newTitleArea: {
    width: width,
    //height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    //opacity: .9,
    //alignItems: 'flex-start',
    //opacity:.3,
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
  },
  titleText: {
    maxWidth: width * 0.99,
    maxHeight: height * 0.15,
    textAlign: 'center',
    //marginTop: 5,
    fontWeight: '100',

    //marginLeft: 1,
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    //backgroundColor:'red'
  },
  descText: {
    marginHorizontal: 5,
    color: 'white',
    fontSize: 0.043 * width,
    textAlign: 'center',
  },
  goNewsDetailText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    paddingLeft: 5,
  },
  goNewsDetailArea: {
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
  },
  scrollArea: {
    maxHeight: width,
    width: width * 0.98,
    //backgroundColor: 'red',
  },
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
