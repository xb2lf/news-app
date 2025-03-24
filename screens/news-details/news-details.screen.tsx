/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-23 22:11:58
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 21:48:55
 * @Description:
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { ChevronLeftIcon, ShareIcon } from 'react-native-heroicons/outline';
import { BookmarkSquareIcon } from 'react-native-heroicons/solid';
import WebView from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const NewsDetailsScreen = () => {
  const router = useRouter();
  const { item } = useLocalSearchParams<{ item: string }>();
  const newsItem = item ? JSON.parse(item) : {};
  const [isBookmared, setIsBookmarked] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const toggleBookmarkAndSave = async () => {
    if (!Object.keys(newsItem).length) return;
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles');
      const savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
      const isNewsBookmarked = savedArticlesArray.some(
        (savedArticle: any) => savedArticle?.url === newsItem?.url
      );
      if (!isNewsBookmarked) {
        savedArticlesArray.push(newsItem);
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(savedArticlesArray)
        );
        setIsBookmarked(true);
      } else {
        const updatedArticlesArray = savedArticlesArray.filter(
          (savedArticle: any) => savedArticle?.url !== newsItem?.url
        );
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(updatedArticlesArray)
        );
        setIsBookmarked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadSavedArticles = async () => {
    if (!Object.keys(newsItem).length) return;
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles');
      const savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
      const isNewsleBookmarked = savedArticlesArray.some(
        (savedArticle: any) => savedArticle?.url === newsItem?.url
      );
      setIsBookmarked(isNewsleBookmarked);
    } catch (error) {
      console.log('Error loading saved search news');
    }
  };

  useEffect(() => {
    loadSavedArticles();
  }, [newsItem]);
  return (
    <>
      {/* Header */}
      <View className='w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white'>
        <View className='bg-gray-100 p-2 rounded-full justify-center items-center'>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeftIcon size={25} color='gray' strokeWidth={3} />
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-center items-center bg-white space-x-3 rounded-full'>
          <TouchableOpacity className='bg-gray-100 p-2 rounded-full'>
            <ShareIcon size={25} color='gray' strokeWidth={3} />
          </TouchableOpacity>
          <TouchableOpacity
            className='bg-gray-100 p-2 rounded-full'
            onPress={toggleBookmarkAndSave}
          >
            <BookmarkSquareIcon
              size={25}
              color={isBookmared ? 'green' : 'gray'}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* WebView */}
      {newsItem?.url && (
        <WebView
          source={{ uri: newsItem?.url }}
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
        />
      )}
      {visible && (
        <ActivityIndicator
          size='large'
          color='green'
          style={{ position: 'absolute', left: width / 2, top: height / 2 }}
        />
      )}
    </>
  );
};

export default NewsDetailsScreen;
