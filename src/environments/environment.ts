// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
