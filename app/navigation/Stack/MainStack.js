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
import ScreenRevisionsTools from "../../js/screens/ScreenRevisionsTools";
import StringsManager from "js/helpers/StringsManager";
import * as strings from "js/helpers/StringsManager";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  let stringsManager = new StringsManager();
  const strLang = useSelector((state) => state.strLang);
  stringsManager.setLanguage(strLang);
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen
        name="ScrList"
        component={ScreenRevisions}
        options={{
          header: () => (
            <Header
              lang={{ strLang }}
              title={stringsManager.getStr(strings.STR_DAWEM)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ScrRev"
        component={ScreenRevisionDetails}
        options={{
          header: () => (
            <Header
              lang={{ strLang }}
              title={stringsManager.getStr(strings.STR_DAWEM)}
            />
          ),
        }}
      />
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
        options={{
          header: () => (
            <Header
              lang={{ strLang }}
              title={stringsManager.getStr(strings.STR_DAYBADGE_NAME)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ScrMonthBadge"
        component={ScreenMonthBadge}
        options={{
          header: () => (
            <Header
              lang={{ strLang }}
              title={stringsManager.getStr(strings.STR_MONTHBADGE_NAME)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ScrWeekBadge"
        component={ScreenWeekBadge}
        options={{
          header: () => (
            <Header
              lang={{ strLang }}
              title={stringsManager.getStr(strings.STR_WEEKBADGE_NAME)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ScrRevTools"
        component={ScreenRevisionsTools}
        options={{
          header: () => (
            <Header
              lang={{ strLang }}
              title={stringsManager.getStr(strings.STR_REV_TOOLS)}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
