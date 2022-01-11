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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import ButtonsArea from './ButtonsArea';
import * as Clipboard from 'expo-clipboard';
import SmallAlert from './SmallAlert';

const Listnews = ({ navigation }) => {
  // const index = useRef(0);
  // const position = useRef(Animated.divide(scrollX, width)).current;
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [image, setImage] = useState('');
  // const [source, setSource] = useState('');
  // const [url, setUrl] = useState('');

  const [news, setNews] = useState([]);

  //const [modalVisible, setModalVisible] = useState(false);
  const [copiedText, setCopiedText] = React.useState('');
  const [coppiedAlert, setCoppiedAlert] = useState(false);
  //const [openedUrl, setOpenedUrl] = useState('');
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
            <View style={styles.newAreaGenerator}>
              <View style={styles.sourceArea}>
                <View style={styles.source}>
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

              <View style={styles.TitleArea}>
                <View style={styles.Title}>
                  <Text style={styles.titleText}>{item.name}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <ButtonsArea
          copyAction={item.url}
          navigate={() => navigation.navigate('SavedNews')}
          save={() => Alert.alert('onlongPress')}
          openAction={item.url}
          shareAction={item.url}
        />

        <View style={styles.DescprictionArea}>
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

      <SmallAlert status={coppiedAlert} AlertText={'Panoya Kopyalandı'} />
    </View>
  );
};

export default Listnews;

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

  //NEW AREA
  newAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: width,
    width: width,
    backgroundColor: '#181D31',
  },
  newAreaGenerator: {
    height: width,
    width: width,
    justifyContent: 'space-around',
    alignItems: 'center',
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
  //NEW AREA //

  //SOURCE AREA
  sourceArea: {
    height: height * 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  source: {
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
  //SOURCE AREA //

  //ARROW AREA
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
  //ARROW AREA //

  //TİTLE AREA
  TitleArea: {
    maxWidth: width * 0.99,
    height: height * 0.2,
    justifyContent: 'flex-end',
  },
  Title: {
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
  //TİTLE AREA //

  //DESC AREA
  DescprictionArea: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    maxHeight: width,
    //maxHeight:width-height-1,
    width: width * 0.98,
    maxWidth: width * 0.99,
    //backgroundColor: 'green',
  },
  scrollArea: {
    maxHeight: width,
    width: width * 0.98,
    //backgroundColor: 'red',
  },
  descText: {
    marginHorizontal: 5,
    color: 'white',
    fontSize: 0.043 * width,
    textAlign: 'center',
  },
  //DESC AREA//

  //BUTTONS AREA
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
  //BUTTONS AREA //
});
