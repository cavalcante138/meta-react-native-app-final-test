import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { getMenuItemsByCategory } from '../database/database';

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
        const backgroundColor = item.selected ? '#f2f2f2' : 'white';
        const textColor = item.selected ? 'black' : 'gray';
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: backgroundColor,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 5,
                    marginHorizontal: 10,
                }}
                onPress={() => onCategoryPress(item.id)}
            >
                <Text style={{ color: textColor }}>{item.name}</Text>
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
