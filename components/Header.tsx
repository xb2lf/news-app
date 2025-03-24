import { useRouter } from 'expo-router';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

const Header = () => {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className='flex-row justify-between items-center mx-4 mt-4'>
      <View>
        <Text
          className='text-2xl text-green-800 dark:text-white uppercase'
          style={{ fontFamily: 'SpaceGroteskBold' }}
        >
          stack news
        </Text>
      </View>
      <View className='flex-row space-x-4 rounded-full justify-center items-center'>
        <Switch value={colorScheme === 'dark'} onChange={toggleColorScheme} />
        <TouchableOpacity
          className='bg-gray-200 dark:bg-green-800 rounded-full p-2'
          onPress={() => router.push('/(tabs)/search')}
        >
          <MagnifyingGlassIcon
            size={25}
            color={colorScheme === 'dark' ? 'white' : 'green'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
