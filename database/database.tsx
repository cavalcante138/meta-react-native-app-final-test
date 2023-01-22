import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
    return new Promise((resolve: any, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);"
          );
        },
        reject,
        resolve
      );
    });
  }

  export async function getMenuItems(): Promise<any> {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql("select * from menuitems", [], (_, { rows }) => {
          resolve(rows._array);
        });
      });
    });
  }

  export function saveMenuItems(menuItems: any[]) {
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        try {
          tx.executeSql(
            "insert into menuitems ( name, price, description, image, category) values (?, ?, ?, ?, ?)",
            [item.name, item.price, item.description, item.image, item.category]
          );
        } catch (error) {
          console.log(`Error inserting menu item ${item.name}: ${error}`);
        }
      });
    });
  }

  export async function getMenuItemsByCategory(categories: any[]): Promise<any[]> {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(`select * from menuitems where category in (${categories.map(c => `'${c.name}'`).join(', ')})`, [], (_, { rows }) => {
          resolve(rows._array);
        });
      });
    });
  }

  export async function filterDishes(searchText: string, categories: any[]): Promise<any[]>{
    return new Promise((resolve) => {
      db.transaction((tx) => {
        let query = `SELECT * FROM menuitems WHERE name LIKE '%${searchText}%'`;
        if (categories.length > 0) {
          query += ` AND category IN (${categories.map(c => `'${c.name}'`).join(',')})`;
        }
        tx.executeSql(query, [], (_, { rows }) => {
          resolve(rows._array);
        });
      });
    });
  }