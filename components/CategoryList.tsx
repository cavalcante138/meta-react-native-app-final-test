import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

interface Category {
  id: string;
  name: string;
  selected: boolean;
}

interface Props {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

const CategoriesList = (props: Props) => {

  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])


  const onCategoryPress = async (categoryId: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, selected: !category.selected };
      }
      return category;
    });
    setCategories(updatedCategories);
    props.onCategorySelect(categoryId);

  };

  const renderCategory = ({ item }: { item: Category }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#edefee',
          padding: 10,
          borderRadius: 30,
          marginVertical: 5,
          marginRight: 10,
          opacity: item.selected ? 1 : 0.4
        }}
        onPress={() => onCategoryPress(item.id)}
      >
        <Text style={{ color: '#495e57', 
          fontFamily: 'Karla_700Bold',
          textTransform: 'capitalize'
          }}>
            {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={item => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CategoriesList;
