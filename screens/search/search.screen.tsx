/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-23 22:05:32
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 22:08:26
 * @Description:
 */
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import { useRouter } from 'expo-router';
import { fetchSearchNews } from '@/utils/NewsApi';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NewsSection from '@/components/NewsSection';
import Loading from '@/components/Loading';

const SearchScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
    if (search && search.length > 2) {
      setLoading(true);
      setResults([]);
      try {
        const data = await fetchSearchNews(search);
        setLoading(false);
        if (data && data?.articles) {
          setResults(data?.articles);
        }
      } catch (error) {
        console.log('Error searching news', error);
      }
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-neutral-900'>
      {/* Header Search */}
      <View className='mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg'>
        <TextInput
          placeholder='Search for your news'
          placeholderTextColor='gray'
          className='font-medium text-black -tracking-wider p-3 py-2 w-[90%]'
          value={searchTerm}
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity onPress={() => router.push('/(tabs)')}>
          <XMarkIcon size={25} color='green' strokeWidth={3} />
        </TouchableOpacity>
      </View>
      {/* News List Title */}
      <View className='mx-4 mb-4'>
        <Text
          className='text-xl dark:text-white'
          style={{ fontFamily: 'SpaceGroteskBold' }}
        >
          {results.length} News for {searchTerm}
        </Text>
      </View>
      {/* News List Content */}
      {loading ? (
        <View className='flex-1 bg-white dark:bg-neutral-900'>
          <Loading />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp(5) }}
        >
          <NewsSection label='Search Result' newsProps={results} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
