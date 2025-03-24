import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

type BreakingNewsCardProps = {
  item: any;
  onPress: (item: any) => void;
} & TouchableNativeFeedbackProps;

const BreakingNewsCard = ({
  item,
  onPress,
  ...touchProps
}: BreakingNewsCardProps) => {
  return (
    <TouchableNativeFeedback onPress={() => onPress(item)} {...touchProps}>
      <View className='relative'>
        <Image
          source={{ uri: item?.urlToImage || 'https://picsum.photos/200/300' }}
          style={{ width: width * 0.8, height: height * 0.22 }}
          contentFit='cover'
          className='rounded-3xl'
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <View className='absolute bottom-6 left-4 justify-end h-[80%]'>
          <View className='space-y-1'>
            <View className='max-w-[98%]'>
              <Text
                numberOfLines={2}
                className='text-white text-base font-semibold capitalize'
              >
                {item?.title?.length > 60
                  ? `${item?.title?.slie(0, 58)}...`
                  : item?.title?.split(' - ')[0] || 'N/A'}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={1}
                className='text-neutral-300 text-sm font-semibold'
              >
                {item?.author?.length > 20
                  ? `${item?.author?.slice(0, 20)}...`
                  : item?.author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default BreakingNewsCard;
