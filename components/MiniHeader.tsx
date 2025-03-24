import { View, Text } from 'react-native';
import React from 'react';

type MiniHeaderProps = {
  label: string;
};

const MiniHeader = ({ label }: MiniHeaderProps) => {
  return (
    <View className='flex-row justify-between items-center px-4 my-4'>
      <Text
        className='text-xl text-green-800 dark:text-white'
        style={{ fontFamily: 'SpaceGroteskBold' }}
      >
        {label}
      </Text>
      <Text
        className='tet-base text-gray-600 dark:text-neutral-300'
        style={{ fontFamily: 'SpaceGroteskMedium' }}
      >
        View All
      </Text>
    </View>
  );
};

export default MiniHeader;
