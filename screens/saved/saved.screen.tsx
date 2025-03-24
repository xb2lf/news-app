/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-23 22:08:30
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 21:53:25
 * @Description:
 */
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NewsSectionCard from '@/components/NewsSectionCard';

const SavedScreen = () => {
  const router = useRouter();
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const [urlList, setUrlList] = useState<any[]>([]);
  const [bookmarkStatus, setBookmarkStatus] = useState<any[]>([]);

  const handleClearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem('savedArticles');
      setSavedArticles([]);
      setBookmarkStatus([]);
      setUrlList([]);
    } catch (error) {
      console.log('Error clear articles', error);
    }
  };

  const handlePress = (item: any) => {
    router.push({
      pathname: '/(routes)/news-details',
      params: { item: JSON.stringify(item) },
    });
  };

  const toggleBookmarkAndSave = async (item: any, index: number) => {
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles');
      const savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
      const isAricleBookmarked = savedArticlesArray.some(
        (savedArticle: any) => savedArticle?.url === item?.url
      );
      if (!isAricleBookmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        const updatedArticlesArray = savedArticlesArray.filter(
          (savedArticle: any) => savedArticle?.url !== item?.url
        );
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(updatedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadSavedArticles = useCallback(async () => {
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles');
      const savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
      setSavedArticles(savedArticlesArray);
    } catch (error) {
      console.log('Error loading saved articles');
    }
  }, [urlList, router]);

  useFocusEffect(() => {
    loadSavedArticles();
  });

  useEffect(() => {
    if (!savedArticles.length) return;
    const urls = savedArticles.map((item) => item?.url);
    setUrlList(urls);
  }, [savedArticles]);

  return (
    <SafeAreaView className='flex-1 bg-white p-4 dark:bg-neutral-900'>
      {/* Header */}
      <View className='flex-row justify-between items-center'>
        <Text
          className='font-bold text-xl text-green-800 dark:text-white'
          style={{ fontFamily: 'SpaceGroteskBold' }}
        >
          Saved Articles
        </Text>
        <TouchableOpacity
          className='bg-green-800 py-2 px-4 rounded-lg'
          onPress={handleClearSavedArticles}
        >
          <Text
            className='text-white dark:text-white'
            style={{ fontFamily: 'SpaceGroteskMedium' }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>
      {/* Content */}
      <View className='flex-1 space-y-2' style={{ marginVertical: hp(2) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={savedArticles}
          keyExtractor={(item, index) => (item?.id || index).toString()}
          renderItem={({ item, index }) => (
            <NewsSectionCard
              item={item}
              index={index}
              isSave={bookmarkStatus[index]}
              isDiscover={false}
              handlePress={handlePress}
              toggleBookmarkAndSave={toggleBookmarkAndSave}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;
