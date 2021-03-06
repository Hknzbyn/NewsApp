import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TouchableHighlight,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebViewModal from '../components/WebViewModal';
import { AntDesign } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import SmallAlert from '../components/SmallAlert';

const { width, height } = Dimensions.get('window');

const SavedNews = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [openedUrl, setOpenedUrl] = useState('');
  const [alertStatus, SetAlertStatus] = useState(false);

  const [alertText, setAlertText] = useState('');
  //const [news, setNews] = useState([]);
  const [listData, setListData] = useState(
    Array(20)
      .fill('')
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  useEffect(() => {
    getSaved();
  }, []);

  //function that retrieves previously recorded news
  const getSaved = async () => {
    try {
      const myArray = await AsyncStorage.getItem('@SavedNews');
      if (myArray !== null) {
        setListData(JSON.parse(myArray));
      }
    } catch (error) {
    }
  };

// function Share specific news
  const Func_Share = async (url) => {
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

// function Delete specific news
const deleteNew = async (deletedNew) => {
    var asyncData = await AsyncStorage.getItem('@SavedNews');
    var data = JSON.parse(asyncData);
    if (data.find((x) => x.url == deletedNew.url)) {
      data.splice(
        data.findIndex((x) => x.url == deletedNew.url),
        1
      );
      await AsyncStorage.removeItem('@SavedNews');

      await AsyncStorage.setItem('@SavedNews', JSON.stringify(data));
      SetAlertStatus(true);
      setAlertText('Haber Kald??r??ld??');
      setTimeout(() => {
        SetAlertStatus(false);
      }, 1500);
    }

    getSaved();
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
  };

  const Func_Open = (url) => {
    setOpenedUrl(url);
    setModalVisible(true);
  };

  const renderItem = (data) => (
    <TouchableHighlight style={styles.containerView} underlayColor={'#AAA'}>
      <TouchableOpacity
        onPress={() => Func_Open(data.item.url)}
        style={styles.newCardContainer}>
        <View>
          <Image style={styles.imageArea} source={{ uri: data.item.image }} />
        </View>

        <View style={styles.titleArea}>
          <Text numberOfLines={3} ellipsizeMode='tail' style={styles.titleText}>
            {data.item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <TouchableOpacity
          onPress={() => Func_Share(data.item.url)}
          style={styles.button}>
          <AntDesign name='sharealt' size={30} color='#F0E9D2' />
        </TouchableOpacity>
        <Text style={styles.text}>Payla??</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteNew(data.item)}>
        <View style={styles.button}>
          <AntDesign name='delete' size={30} color='#F0E9D2' />
        </View>
        <Text style={styles.text}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.containerView}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={5}
        rightOpenValue={-height * 0.14}
        //previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
      <View>
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

export default SavedNews;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#181D31',
    justifyContent: 'center',
    alignItems: 'center',
    //marginVertical:5,
  },
  newCardContainer: {
    marginTop: 5,
    flexDirection: 'row',
    width: width,
    height: height * 0.13,
    backgroundColor: '#678983',
    justifyContent: 'space-between',
    alignItems: 'center',
    //borderWidth:1,
    borderColor: 'gray',

    shadowOffset: {
      width: 20,
      height: -20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowColor: 'white',
  },
  imageArea: {
    height: height * 0.13,
    width: height * 0.13,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  titleArea: {
    paddingHorizontal: 5,
    width: width - height * 0.13,
    height: height * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'purple',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    color: 'white',
  },
  buttonArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'gray',
  },
  button: {
    height: height * 0.07,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#678983',
    height: height * 0.13,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    //paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 65,
  },
  backRightBtnLeft: {
    //backgroundColor: 'blue',
    right: 65,
  },
  backRightBtnRight: {
    //backgroundColor: 'red',
    right: 0,
  },
});
