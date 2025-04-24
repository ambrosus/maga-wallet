import 'react-native-gesture-handler/jestSetup';
require('react-native-reanimated').setUpTests();
// Include this section for mocking react-native-screens
jest.mock('react-native-screens', () => {
  // Require actual module instead of a mock
  let screens = jest.requireActual('react-native-screens');

  // All exports in react-native-screens are getters
  // We cannot use spread for cloning as it will call the getters
  // So we need to clone it with Object.create
  screens = Object.create(
    Object.getPrototypeOf(screens),
    Object.getOwnPropertyDescriptors(screens)
  );

  // Add mock of the component you need
  // Here is the example of mocking the Screen component as a View
  Object.defineProperty(screens, 'Screen', {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    value: require('react-native').View
  });

  return screens;
});
