/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import firebase from './src/firebase';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);
