/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-23 22:02:09
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 19:02:26
 * @Description:
 */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import { categories } from '@/constants';
import Categories from '@/components/Categories';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDiscoverNews } from '@/utils/NewsApi';
import Loading from '@/components/Loading';
import NewsSection from '@/components/NewsSection';

const DiscoverScreen = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('business');

  // Discover News
  const {
    isLoading: isDiscoverNewsLoading,
    data: discoverNews,
    isError: isDiscoverNewsError,
  } = useQuery({
    queryKey: ['discoverNews', activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
    select: (originalData) => {
      const filteredNews = originalData?.articles
        ? originalData?.articles?.filter(
            (article: any) => article?.title !== ' [Removed]'
          )
        : [];
      return filteredNews;
    },
  });

  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    console.log('activeCategory', activeCategory);
  }, [activeCategory]);
  return (
    <SafeAreaView className='flex-1 pt-8 bg-white dark:bg-neutral-900'>
      <View>
        {/* Header */}
        <View className='px-4 mb-6 justify-between'>
          <Text
            className='text-xl text-green-800 dark:text-white uppercase'
            style={{ fontFamily: 'SpaceGroteskBold' }}
          >
            Dsicover
          </Text>
          <Text
            className='text-base text-gray-600 dark:text-neutral-300'
            style={{
              fontFamily: 'SpaceGroteskMedium',
            }}
          >
            News from all over the world
          </Text>
        </View>
        {/* Saerch */}
        <View className='mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full'>
          <TouchableOpacity className='pl-2'>
            <MagnifyingGlassIcon size={25} color={'gray'} />
          </TouchableOpacity>
          <TextInput
            placeholder='Search for news'
            placeholderTextColor={'gray'}
            className='flex-1 pl-4 font-medium text-black tracking-wider'
            onPressIn={() => router.push('/(tabs)/search')}
          />
        </View>
        {/* Categories */}
        <View className='flex-row mx-4 mb-8'>
          <Categories
            categoryList={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <View className='h-full'>
          {/* HeadeTitle */}
          <View className='flex-row justify-between items-center mx-4'>
            <Text
              className='text-xl dark:text-white'
              style={{ fontFamily: 'SpaceGroteskBold' }}
            >
              Discover
            </Text>
            <Text
              className='text-base text-green-800 dark:text-neutral-300'
              style={{ fontFamily: 'SpaceGroteskBold' }}
            >
              View All
            </Text>
          </View>
          {/* Content */}
          {isDiscoverNewsLoading || isDiscoverNewsError ? (
            <Loading />
          ) : (
            <ScrollView contentContainerStyle={{ paddingBottom: hp(70) }}>
              <NewsSection label='Discover' newsProps={discoverNews || []} />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
