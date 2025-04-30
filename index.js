import 'react-native-reanimated';
import './globals';
import { AppRegistry } from 'react-native';
import { App } from '@app';
import { name as appName } from './app.json';
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => App);
