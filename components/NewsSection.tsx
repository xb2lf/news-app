import { useFocusEffect, useRouter } from 'expo-router';
import { View, FlatList, TouchableOpacityProps } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import NewsSectionCard from '@/components/NewsSectionCard';

type NewsSectionProps = {
  label: string;
  newsProps: any[];
} & TouchableOpacityProps;

const NewsSection = ({ label, newsProps }: NewsSectionProps) => {
  const router = useRouter();
  const [urlList, setUrlList] = useState<any[]>([]);
  const [bookmarkStatus, setBookmarkStatus] = useState<any[]>([]);

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
      const isArticleBookmarkedList = urlList.map((url) =>
        savedArticlesArray.some(
          (savedArticle: any) => savedArticle?.url === url
        )
      );
      setBookmarkStatus(isArticleBookmarkedList);
    } catch (error) {
      console.log('Error loading saved articles');
    }
  }, [urlList, router]);

  useEffect(() => {
    if (!newsProps.length) return;
    const urls = newsProps.map((item) => item?.url);
    setUrlList(urls);
  }, [newsProps]);

  useFocusEffect(() => {
    loadSavedArticles();
  });

  return (
    <View className='space-y-2 bg-white dark:bg-neutral-900'>
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={newsProps}
        keyExtractor={(item, index) => (item?.id || index).toString()}
        renderItem={({ item, index }) => (
          <NewsSectionCard
            item={item}
            index={index}
            isSave={bookmarkStatus[index]}
            handlePress={handlePress}
            toggleBookmarkAndSave={toggleBookmarkAndSave}
          />
        )}
      />
    </View>
  );
};

export default NewsSection;
