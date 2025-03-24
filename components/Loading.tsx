import { View, Text, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size='large' color='green' />
    </View>
  );
};

export default Loading;
