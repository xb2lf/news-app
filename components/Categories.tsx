/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-24 15:59:48
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 17:31:32
 * @Description:
 */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type CategoriesProps = {
  categoryList: { id: number; title: string }[];
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
};

const Categories = ({
  categoryList,
  activeCategory,
  handleChangeCategory,
}: CategoriesProps) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='space-x-4'
        /* contentContainerStyle={{ paddingRight: 20 }} */
      >
        {categoryList.map((category, index) => {
          const isActive = activeCategory === category.title;
          const activeButtonClass = isActive
            ? 'bg-green-700'
            : 'bg-black/10 dark:bg-neutral-600';
          const activeTextClass = isActive
            ? 'text-white'
            : 'text-gray-600 dark:text-neutral-300';
          return (
            <TouchableOpacity
              key={category.id || index}
              className='flex items-center space-y-1'
              style={{ paddingRight: 20 }}
              onPress={() => handleChangeCategory(category.title)}
            >
              <View className={`rounded-full py-2 px-4 ${activeButtonClass}`}>
                <Text
                  className={`capitalize ${activeTextClass}`}
                  style={{ fontSize: hp(1.5) }}
                >
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
