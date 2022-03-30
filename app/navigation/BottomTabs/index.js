import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, View } from 'react-native';

import ScreenSettings from 'app/js/screens/ScreenSettings';
import { colors } from 'app/constants';
import Doaa from 'assets/svg/Doaa.js';
import Mushaf from 'assets/svg/Mushaf';
import MainStack from '../Stack/MainStack';

const BottomTab = createBottomTabNavigator();

const TempScreenOne = () => (
  <View>
    <Text>Temp Screen One</Text>
  </View>
);

export default function BottomNav() {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarVisible: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Main') {
            return <Mushaf color={focused ? colors.primary : '#8789A3'} />;
          } else if (route.name === 'Settings') {
            return (
              <Ionicons
                name="md-settings-sharp"
                size={24}
                color={focused ? colors.primary : '#8789A3'}
              />
            );
          } else if (route.name === 'Doaa') {
            return <Doaa color={focused ? colors.primary : '#8789A3'} />;
          }
        },
      })}
    >
      <BottomTab.Screen name="Main" component={MainStack} />
      <BottomTab.Screen name="Doaa" component={TempScreenOne} />
      <BottomTab.Screen name="Settings" component={ScreenSettings} />
    </BottomTab.Navigator>
  );
}
