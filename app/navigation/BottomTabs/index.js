import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text, View } from "react-native";

import ScreenSettings from "app/js/screens/ScreenSettings";
import { colors } from "app/constants";
import Doaa from "assets/svg/Doaa.js";
import Mushaf from "assets/svg/Mushaf";
import MainStack from "../Stack/MainStack";
import ScreenRevisionsTools from "../../js/screens/ScreenRevisionsTools";
import Header from "app/components/Header";
import StringsManager from "../../js/helpers/StringsManager";
import * as strings from "js/helpers/StringsManager";
import { useSelector } from "react-redux";

const BottomTab = createBottomTabNavigator();

export default function BottomNav() {
  let stringsManager = new StringsManager();
  const strLang = useSelector((state) => state.strLang);
  stringsManager.setLanguage(strLang);
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        headerShown: true,
        tabBarShowLabel: false,
        tabBarVisible: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "Main") {
            return (
              <Ionicons
                color={focused ? colors.primary : "#8789A3"}
                name="home"
                size={24}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Ionicons
                name="md-settings-sharp"
                size={24}
                color={focused ? colors.primary : "#8789A3"}
              />
            );
          } else if (route.name === "Tools") {
            return <Mushaf color={focused ? colors.primary : "#8789A3"} />;
          }
        },
      })}
    >
      <BottomTab.Screen
        name="Tools"
        component={ScreenRevisionsTools}
        options={{
          header: () => (
            <Header
              lang={{ strLang }}
              showIcon={false}
              title={stringsManager.getStr(strings.STR_REV_TOOLS)}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Main"
        component={MainStack}
        options={{
          header: () => null,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={ScreenSettings}
        options={{
          header: () => null,
        }}
      />
    </BottomTab.Navigator>
  );
}
