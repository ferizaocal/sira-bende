/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
LogBox.ignoreAllLogs();

GoogleSignin.configure({
  webClientId:
    '1087596863866-vplab4vnbavhnfo3u7ovbncer2d87set.apps.googleusercontent.com',
  offlineAccess: true,
});

AppRegistry.registerComponent(appName, () => App);
