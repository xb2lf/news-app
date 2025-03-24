import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Image } from 'expo-image';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { formatDate } from '@/utils';
import { BookmarkSquareIcon } from 'react-native-heroicons/solid';

type NewsSectionCardProps = {
  item: any;
  index: number;
  isSave: boolean;
  isDiscover?: boolean;
  handlePress: (item: any) => void;
  toggleBookmarkAndSave: (item: any, index: number) => void;
} & TouchableOpacityProps;

const NewsSectionCard = ({
  item,
  index,
  isSave,
  isDiscover = true,
  handlePress,
  toggleBookmarkAndSave,
  ...touchProps
}: NewsSectionCardProps) => (
  <TouchableOpacity
    key={index}
    style={{ paddingBottom: hp(2) }}
    className={`mb-4 sapce-y-1 ${isDiscover ? 'mx-4' : ''}`}
    onPress={() => handlePress(item)}
    {...touchProps}
  >
    <View className='flex-row justify-start w=[100%] shadow-sm'>
      {/* Image */}
      <Image
        source={{ uri: item?.urlToImage || 'https://picsum.photos/200/300' }}
        style={{ width: hp(9), height: hp(10) }}
        className='rounded-lg'
      />
      {/* Content */}
      <View className='w-[70%] pl-4 justify-center space-y-1'>
        {/* Author */}
        <Text
          numberOfLines={1}
          className='text-xs font-bold text-gray-900 dark:text-neutral-300'
        >
          {item?.author?.length > 20
            ? `${item?.author?.slice(0, 20)}...`
            : item?.author}
        </Text>
        {/* Title */}
        <Text
          numberOfLines={2}
          className='text-neutral-800 max-w-[90%] capitalize dark:text-white'
          style={{ fontSize: hp(1.7), fontFamily: 'SpaceGroteskBold' }}
        >
          {item?.title?.length > 50
            ? `${item?.title?.slie(0, 50)}...`
            : item?.title}
        </Text>
        {/* Date */}
        <Text className='text-xs text-gray-700 dark:text-neutral-300'>
          {item?.publishedAt ? formatDate(item?.publishedAt) : ''}
        </Text>
      </View>
      {/* Bookmark */}
      <View className='w-[10%] justify-center'>
        <TouchableOpacity onPress={() => toggleBookmarkAndSave(item, index)}>
          <BookmarkSquareIcon color={isSave ? 'green' : 'graay'} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default NewsSectionCard;
