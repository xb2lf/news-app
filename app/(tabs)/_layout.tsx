import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const routesList = [
    {
      id: 1,
      name: 'index',
      title: 'Home',
      iconName: 'home',
      iconSzie: 25,
    },
    {
      id: 2,
      name: 'discover/index',
      title: 'Discover',
      iconName: 'compass-outline',
      iconSzie: 25,
    },
    {
      id: 3,
      name: 'saved/index',
      title: 'Saved',
      iconName: 'bookmark-outline',
      iconSzie: 25,
    },
    {
      id: 4,
      name: 'search/index',
      title: 'Search',
      iconName: 'search-outline',
      iconSzie: 25,
    },
  ];
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'SpaceGroteskMedium',
        },
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        },
      }}
    >
      {routesList.map((item) => (
        <Tabs.Screen
          key={item.id}
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={item.iconName as any}
                size={item.iconSzie}
                color={focused ? 'green' : 'gray'}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
