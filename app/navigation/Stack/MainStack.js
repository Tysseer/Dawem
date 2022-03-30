import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScreenRevisions from 'app/js/screens/ScreenRevisions';
import ScreenQuranBrowser from 'app/js/screens/ScreenQuranBrowser';
import ScreenRevisionDetails from 'app/js/screens/ScreenRevisionDetails';
import ScreenSettings from 'app/js/screens/ScreenSettings';
import Header from 'app/components/Header';
import MushafScreen from '../../js/screens/MushafScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen name="ScrList" component={ScreenRevisions} />
      <Stack.Screen name="ScrRev" component={ScreenRevisionDetails} />
      <Stack.Screen
        name="ScrQuran"
        component={ScreenQuranBrowser}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Mushaf" component={MushafScreen} /> */}
      <Stack.Screen name="ScrSettings" component={ScreenSettings} />
    </Stack.Navigator>
  );
}
