import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import ScreenRevisions from "../screens/ScreenRevisions";
import ScreenWelcome from "../screens/ScreenWelcome";
import ScreenLanguage from "../screens/ScreenLanguage";
import ScreenQuranBrowser from "../screens/ScreenQuranBrowser";
import ScreenRevisionDetails from "../screens/ScreenRevisionDetails";
import ScreenSettings from "../screens/ScreenSettings";
import reduxStore from "../redux/reduxStore";
import { colors } from "../../constants";
import Doaa from "../../assets/svg/Doaa.js";
import Mushaf from "../../assets/svg/Mushaf";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
function getHeaderComponent() {
  return (
    <View
      style={{ height: 60, backgroundColor: "#EEEEEE", width: "100%" }}
    ></View>
  );
}
function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        header: () => getHeaderComponent(),
      }}
    >
      {reduxStore.getState().bIsFirstRun ? (
        <Stack.Screen name="ScrLang" component={ScreenLanguage} />
      ) : null}
      {reduxStore.getState().bSkipWelcome == false ? (
        <Stack.Screen
          name="ScrWelcome"
          component={ScreenWelcome}
          options={{
            headerShown: true,
            title: "",
            headerBackTitleVisible: false,
          }}
        />
      ) : null}
      <Stack.Screen name="ScrList" component={ScreenRevisions} />
      <Stack.Screen name="ScrRev" component={ScreenRevisionDetails} />
      <Stack.Screen name="ScrQuran" component={ScreenQuranBrowser} />
      <Stack.Screen name="ScrSettings" component={ScreenSettings} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

const TempScreenOne = () => (
  <View>
    <Text>Temp Screen One</Text>
  </View>
);

const TempScreenTwo = () => (
  <View>
    <Text>Temp Screen Two</Text>
  </View>
);

function RootNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarIcon: ({ focused }) => {
          if (route.name === "Main") {
            return <Mushaf color={focused ? colors.primary : "#8789A3"} />;
          } else if (route.name === "Settings") {
            return (
              <Ionicons
                name="md-settings-sharp"
                size={24}
                color={focused ? colors.primary : "#8789A3"}
              />
            );
          } else if (route.name === "Doaa") {
            return <Doaa color={focused ? colors.primary : "#8789A3"} />;
          }
        },
      })}
    >
      <BottomTab.Screen name="Doaa" component={TempScreenOne} />
      <BottomTab.Screen name="Settings" component={ScreenSettings} />
      <BottomTab.Screen name="Main" component={StackNavigator} />
    </BottomTab.Navigator>
  );
}
