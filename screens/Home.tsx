import { useEffect, useState } from "react";
import { View, Text, Alert, FlatList, Image, StyleSheet, StatusBar, KeyboardAvoidingView } from "react-native";
import CategoriesList from "../components/CategoryList";
import { MainBanner } from "../components/MainBanner";
import { MenuItemCard } from "../components/MenuItemCard";
import { SearchInput } from "../components/SearchInput";
import { createTable, filterDishes, getMenuItems, getMenuItemsByCategory, saveMenuItems } from "../database/database";


const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export interface MenuItem {
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
  const [filterTimeout, setFilterTimeout] = useState<NodeJS.Timeout>();

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
    clearTimeout(filterTimeout);
    try {
      if (filteredCategoriesListByNameSelected.length > 0) {
        setFilterTimeout(setTimeout(async () => {
          const updateData = await filterDishes(filteredText, filteredCategoriesListByNameSelected);
          setData(updateData);
        }, 500));
      } else {
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

    if (filteredCategoriesListByNameSelected.length > 0) {
      const updateData = await filterDishes(filteredText, filteredCategoriesListByNameSelected);
      setData(updateData);
    } else {
      const updateData = await getMenuItemsByCategory(filteredCategoriesListByNameSelected);
      setData(updateData);
    }
  };

  return <View style={styles.container}>
      <StatusBar 
      barStyle="dark-content"
      translucent
      backgroundColor="transparent"
      />
    <MainBanner>
      <SearchInput
        value={filteredText}
        onChange={setFilteredText}
        placeholder="Search" label={"Search"}
      />
    </MainBanner>
    <View style={styles.menuContainer}>
    <Text style={styles.title}>
      Order for Delivery!
    </Text>
    <View style={styles.categoryContainer}>
    <CategoriesList
      categories={categoriesMenu}
      onCategorySelect={handleCategorySelect}
    />
    </View>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatlist}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <MenuItemCard item={item} key={item.id} /> 
      )}
    />
    </View>
  </View>
}


const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "Karla_700Bold",
    marginTop: 20,
    marginBottom: 5,
  },
  flatlist: {
    
  },
  categoryContainer: {
    marginBottom: 2,
  },
});