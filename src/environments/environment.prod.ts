import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyD5A_wHntqUqTvAwBBgABWINF8GIqZafBk",
    authDomain: "disruzba.firebaseapp.com",
    databaseURL: "https://disruzba-default-rtdb.firebaseio.com",
    projectId: "disruzba",
    storageBucket: "disruzba.appspot.com",
    messagingSenderId: "89161656183",
    appId: "1:89161656183:web:240e4499ad5e4c70846372",
    measurementId: "G-GK99R64W27"
  }
};