import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebViewModal from '../components/WebViewModal';
import { shadowOffset } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import AnimatedLottieView from 'lottie-react-native';

import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');

//const saved = AsyncStorage.getItem('@SavedNews');

const SavedNews = ({ navigation }) => {
  const [news, setNews] = useState([]);

  //const [state, SetSate] =useState([]),

  useEffect(() => {
    getSaved();
  }, []);

  const getSaved = async () => {
    try {
      const myArray = await AsyncStorage.getItem('@SavedNews');
      if (myArray !== null) {
        // We have data!!
        //console.log(JSON.parse(myArray));
        setNews(JSON.parse(myArray));
        //SetSate(myArray)
      }
    } catch (error) {
      console.log('getSaved_err');
    }
  };

  const renderSavedNews = ({ item, key }) => {
    return (
      <View style={styles.containerView}>
        <ScrollView>
          <TouchableOpacity style={styles.newCardContainer}>
            <View>
              <Image style={styles.imageArea} source={{ uri: item.image }} />
            </View>

            <View style={styles.titleArea}>
              <Text
                numberOfLines={3}
                ellipsizeMode='tail'
                style={styles.titleText}>
                {item.name}
              </Text>
            </View>
            <TouchableOpacity
              //onPress={props.goPage}
              style={styles.buttonArea}>
              <View style={styles.button}>
                <LottieView
                  //ref={animSave}
                  style={{ width: 45, height: 45 }}
                  source={require('../../assets/Lottie/saveLottie.json')}
                  autoPlay={false}
                  loop={false}
                  speed={2}
                />
              </View>
              <Text style={styles.text}>Sil</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.containerView}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.key}
        renderItem={renderSavedNews}
      />
    </View>
  );
};

export default SavedNews;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#678983',
    justifyContent: 'center',
    alignItems: 'center',
    //marginVertical:5,
  },
  newCardContainer: {
    marginTop: 5,
    flexDirection: 'row',
    width: width,
    height: height * 0.13,
    backgroundColor: '#181D31',
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
    width: width * 0.6,
    height: height * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    color: 'white',
  },

  iconArea: {
    width: width * 0.16,
    height: height * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
