/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-23 21:46:39
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 00:06:22
 * @Description:
 */
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('@/assets/images/welcome/reporter.jpg')}
      resizeMode='cover'
      className='flex-1 justify-center items-center'
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View className='flex-1 items-center justify-end max-w-[85%] space-y-4'>
        <Text
          className='text-5xl shadow-2xl text-white text-center tracking-wider'
          style={{ fontSize: wp(10), fontFamily: 'SpaceGroteskBold' }}
        >
          Stay Informed from Day one
        </Text>
        <Text
          className='text-white text-center max-w-[85%] leading-12 tracking-wider'
          style={{ fontSize: wp(4), fontFamily: 'SpaceGroteskMedium' }}
        >
          Discover the latest News with our Seamless Onboarding Experience
        </Text>
      </View>
      <TouchableOpacity className='bg-green-900 rounded-full p-4 justify-center items-center w-[90%] mt-8 mb-8' onPress={() => router.push('/(tabs)')}>
        <Text
          className='text-white text-base'
          style={{ fontSize: wp(4), fontFamily: 'SpaceGroteskMedium' }}
        >
          Getting Started
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default WelcomeScreen;
