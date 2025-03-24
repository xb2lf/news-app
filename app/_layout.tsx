/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-23 18:00:48
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 11:06:18
 * @Description:
 */
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'nativewind';

const queryClient = new QueryClient();

const RootLayout = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen
            name='index'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='(routes)/splash/index'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='(routes)/welcome/index'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='(tabs)'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='(routes)/news-details/index'
            options={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
export default RootLayout;
