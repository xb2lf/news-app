/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-23 21:51:19
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 17:06:40
 * @Description:
 */
import { View, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchBreakingNews, fetchRecommendedNews } from '@/utils/NewsApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import MiniHeader from '@/components/MiniHeader';
import BreakingNews from '@/components/BreakingNews';
import NewsSection from '@/components/NewsSection';

const HomeScreen = () => {
  // Breaking News
  const {
    isLoading: isBreakingNewsLoading,
    data: breakingNews,
    isError: isBreakingNewsError,
  } = useQuery({
    queryKey: ['breakingNews'],
    queryFn: fetchBreakingNews,
    select: (originalData) =>
      originalData?.articles ? originalData?.articles : [],
  });

  // Recommended News
  const {
    isLoading: isRecommendedNewsLoading,
    data: recommendedNews,
    isError: isRecommendedNewsErro,
  } = useQuery({
    queryKey: ['recommendedNews'],
    queryFn: fetchRecommendedNews,
    select: (originalData) =>
      originalData?.articles ? originalData?.articles : [],
  });

  return (
    <SafeAreaView className='bg-white dark:bg-neutral-900'>
      <Header />
      {isBreakingNewsLoading || isBreakingNewsError ? (
        <Loading />
      ) : (
        <View>
          <MiniHeader label='Breaking News' />
          <BreakingNews label='Breaking News' data={breakingNews || []} />
        </View>
      )}
      <View>
        <MiniHeader label='Recommended News' />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(80),
          }}
        >
          {isRecommendedNewsLoading || isRecommendedNewsErro ? (
            <Loading />
          ) : (
            <NewsSection
              label='Recommendation'
              newsProps={recommendedNews || []}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
