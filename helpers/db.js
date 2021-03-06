import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('deeznuts.db');

export const init = () => {
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx) => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS deeznuts (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
              [],
              ()=> {
                  resolve()
              },
              (_, err)=> {
                  reject(err)
              }
            );
          });

    })
    return promise
};

export const insertPlace = (title, image, address, lat, lng) => {
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx) => {
            tx.executeSql(
              `INSERT INTO deeznuts (title,image,address,lat,lng) VALUES (?,?,?,?,?)`,
              [title,image,address,lat,lng],
              (_, result)=> {
                  resolve(result)
              },
              (_, err)=> {
                  reject(err)
              }
            );
          });

    })
    return promise
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx) => {
            tx.executeSql(
              `SELECT * FROM deeznuts ORDER BY id DESC`,
              [],
              (_, result)=> {
                  resolve(result)
              },
              (_, err)=> {
                  reject(err)
              }
            );
          });

    })
    return promise
}
