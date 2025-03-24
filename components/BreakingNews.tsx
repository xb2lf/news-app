import { useRouter } from 'expo-router';
import { View, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BreakingNewsCard from './BreakingNewsCard';

type BreakingNewsProps = {
  label: string;
  data: any[];
};

const { width } = Dimensions.get('window');

const BreakingNews = ({ label, data }: BreakingNewsProps) => {
  const router = useRouter();

  const handlePress = (item: any) => {
    router.push({
      pathname: '/(routes)/news-details',
      params: { item: JSON.stringify(item) },
    });
  };
  return (
    <View>
      <Carousel
        vertical={false}
        firstItem={0}
        inactiveSlideScale={0.86}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
        data={data}
        keyExtractor={(item, index) => (item.id || index).toString()}
        renderItem={({ item }: { item: any }) => (
          <BreakingNewsCard item={item} onPress={handlePress} />
        )}
      />
    </View>
  );
};

export default BreakingNews;
