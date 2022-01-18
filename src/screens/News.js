import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import {
  Share,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import {AntDesign} from '@expo/vector-icons';

import axios from 'axios';

let auth = `apikey 34FaGOqdR66cgDjud0bctG:6t1MsC57SIfyxpfJZvYwdp`; //auth key
let urlBase = `https://api.collectapi.com/news/getNews?country=tr&tag=general`; //api url

import ButtonsArea from '../components/ButtonsArea';

const News = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const topRef = React.useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    getData();
  }, []);

  //function that gets data from api 
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
      });
  };

  //clicking left or right button
  const scrollToActiveIndex = (key) => {
    setActiveIndex(key);
    topRef?.current?.scrollToOffset({
      offset: key * width,
      animated: true,
    });
  };

  const renderNewsItems = ({ item, key }) => {
    return (
      <View style={styles.container}>
        <View style={styles.newAreaContainer}>
          <ImageBackground
            style={{
              resizeMode: 'cover',
              opacity: 0.8,
            }}
            source={{ uri: item.image }}>
            <View style={styles.newAreaGenerator}>
              <View style={styles.sourceArea}>
                <View style={styles.source}>
                  <Text style={styles.sourceText}>
                    {item.source} 
                  </Text>
                </View>
              </View>

              <View style={styles.arrowArea}>
                {item.key == 0 ? (
                  <View style={{ width: 50, height: 50 }}></View>
                ) : (
                  <Pressable
                    onPress={() => scrollToActiveIndex(activeIndex - 1)}
                    style={styles.arrow}>
                    <AntDesign name='left' size={35} color='white' />
                  </Pressable>
                )}

                {item.key == news.length - 1 ? (
                  <View style={{ width: 50, height: 50 }}></View>
                ) : (
                  <Pressable
                    onPress={() => scrollToActiveIndex(activeIndex + 1)}
                    style={styles.arrow}>
                    <AntDesign name='right' size={35} color='white' />
                  </Pressable>
                )}
              </View>

              <View style={styles.TitleArea}>
                <View style={styles.Title}>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode='tail'
                    style={styles.titleText}>
                    {item.name}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <ButtonsArea
          ActiveItem={item.url}
          copyAction={item.url}
          goPage={() => navigation.navigate('SavedNews')}
          index={item}
          //saveText={item.source}
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
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        onMomentumScrollEnd={(ev) => {
          setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
      />
    </View>
  );
};

export default News;

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

  //NEW AREA->
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
  //NEW AREA //

  //SOURCE AREA->
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

  //ARROW AREA ->
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

  //TİTLE AREA->
  TitleArea: {
    maxWidth: width * 0.99,
    height: height * 0.2,
    justifyContent: 'flex-end',
  },
  Title: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
  },
  titleText: {
    maxWidth: width * 0.99,
    maxHeight: height * 0.15,
    textAlign: 'center',
    fontWeight: '100',
    marginHorizontal: 3,
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  //TİTLE AREA //

  //DESC AREA->
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
});
