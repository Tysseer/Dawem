import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ScreenRevisions from "app/js/screens/ScreenRevisions";
import ScreenQuranBrowser from "app/js/screens/ScreenQuranBrowser";
import ScreenRevisionDetails from "app/js/screens/ScreenRevisionDetails";
import ScreenSettings from "app/js/screens/ScreenSettings";
import Header from "app/components/Header";
import MushafScreen from "../../js/screens/MushafScreen";
import ScreenDayBadge from "../../js/screens/ScreenDayBadge";
import ScreenMonthBadge from "../../js/screens/ScreenMonthBadge";
import ScreenWeekBadge from "../../js/screens/ScreenWeekBadge";
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
      <Stack.Screen
        name="Mushaf"
        component={MushafScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ScrSettings" component={ScreenSettings} />
      <Stack.Screen
        name="ScrDayBadge"
        component={ScreenDayBadge}
        options={{ header: () => <Header title={"Welcome"} /> }}
      />
      <Stack.Screen name="ScrMonthBadge" component={ScreenMonthBadge} />
      <Stack.Screen name="ScrWeekBadge" component={ScreenWeekBadge} />
    </Stack.Navigator>
  );
}
