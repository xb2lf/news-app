/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-23 21:40:49
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 14:35:49
 * @Description:
 */
import { useRouter } from 'expo-router';
import { View, Text, ImageBackground } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const SplashScreens = () => {
  const router = useRouter();
  const [fontsloaded, fontError] = useFonts({
    SpaceGroteskLight: require('@/fonts/SpaceGrotesk_300Light.ttf'),
    SpaceGroteskRegular: require('@/fonts/SpaceGrotesk_400Regular.ttf'),
    SpaceGroteskMedium: require('@/fonts/SpaceGrotesk_500Medium.ttf'),
    SpaceGroteskSemiBold: require('@/fonts/SpaceGrotesk_600SemiBold.ttf'),
    SpaceGroteskBold: require('@/fonts/SpaceGrotesk_700Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsloaded || fontError) {
      await SplashScreen.hideAsync();
    }
    const timer = setTimeout(() => {
      router.push('/(routes)/welcome');
      clearTimeout(timer);
    }, 3000);
  }, [fontsloaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [fontsloaded, fontError]);

  if (!fontsloaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('@/assets/images/welcome/reporter.jpg')}
      className='flex-1 justify-center items-center'
      resizeMode='cover'
    >
      <LinearGradient
        colors={['rgba(0,85,0,0.95)', 'rgba(0,85,0,0.95)']}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View onLayout={onLayoutRootView}>
        <Text className='text-white text-3xl font-extrabold uppercase'>
          Stack News
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreens;
