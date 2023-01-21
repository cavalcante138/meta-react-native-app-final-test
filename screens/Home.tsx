import { useEffect, useState } from "react";
import { View, Text, Alert, FlatList, Image } from "react-native";
import CategoriesList from "../components/CategoryList";
import { InputLemon } from "../components/InputLemon";
import { createTable, filterDishes, getMenuItems, getMenuItemsByCategory, saveMenuItems } from "../database/database";


const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

interface MenuItem {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
} 
interface Category {
    id: string;
    name: string;
    selected: boolean;
}

export const Home = () => {

    const [data, setData] = useState([] as MenuItem[]);
    const [categoriesMenu, setCategoriesMenu] = useState([] as Category[]);
    const [filteredText, setFilteredText] = useState("");

    const fetchData = async () => {
        const data = await (await (await fetch(API_URL)).json()).menu;
    
        const menuData = data.map((el: MenuItem) => {
          return {
            name: el.name,
            price: el.price,
            description: el.description,
            image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${el.image}?raw=true`,
            category: el.category,
          };
        });

        return menuData;
    };

    async function checkGetMenuItems() {
        try {
            const menuItems = await getMenuItems();
            console.log(`Data retrieved successfully: ${JSON.stringify(menuItems)}`);
            return menuItems;
        } catch (error) {
            console.log(`Error retrieving data: ${error}`);
        }
    }

    useEffect(() => {
        (async () => {
          try {
            await createTable();

            let menuItems = await checkGetMenuItems();

            if (!menuItems.length) {
              const menuItems = await fetchData();
              await saveMenuItems(menuItems);
            }

            menuItems = await checkGetMenuItems();

            const uniqueCategories = [...new Set(menuItems.map(item => item.category))];

            setCategoriesMenu(uniqueCategories.map((category: string) => {
                return {
                    id: category,
                    name: category,
                    selected: true,
                };
            }));

            setData(menuItems);
          } catch (e) {

            Alert.alert(e.message);
          }
        })();
      }, []);

    useEffect(() => {
        handleFilterData();
    }, [filteredText]);

    const handleFilterData = async () => {
        const filteredCategoriesListByNameSelected = categoriesMenu.filter(category => category.selected === true);
        console.log(filteredCategoriesListByNameSelected);

        try {
            if(filteredCategoriesListByNameSelected.length > 0){
                const updateData = await filterDishes(filteredText, filteredCategoriesListByNameSelected);
                setData(updateData);
            }else{
                const updateData = await getMenuItemsByCategory(filteredCategoriesListByNameSelected);
                setData(updateData);
            }
            
        } catch (error) {
            console.log(error);
        }


    };


    
    const handleCategorySelect = async (categoryId: string) => {
        const updatedCategories = categoriesMenu.map(category => {
            if (category.id === categoryId) {
                return { ...category, selected: !category.selected };
            }
            return category;
        }
        );
        setCategoriesMenu(updatedCategories);

        const filteredCategoriesListByNameSelected = updatedCategories.filter(category => category.selected === true);

        if(filteredCategoriesListByNameSelected.length > 0){
            const updateData = await filterDishes(filteredText, filteredCategoriesListByNameSelected);
            setData(updateData);
        }else{
            const updateData = await getMenuItemsByCategory(filteredCategoriesListByNameSelected);
            setData(updateData);
        }
    };

    return <View><Text>Home</Text>

                <InputLemon
            value={filteredText}
            onChange={setFilteredText}
            placeholder="Search" label={"Search"}  
            />

                <CategoriesList
                categories={categoriesMenu}
                onCategorySelect={handleCategorySelect}
            />
          <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.price}</Text>
                        <Image
      source={{ uri: item.image }}
      style={{ width: 50, height: 50 }}
    />
                        <Text>{item.description}</Text>
                        <Text>{item.category}</Text>
                    </View>
                )}
            />
    </View>
}

