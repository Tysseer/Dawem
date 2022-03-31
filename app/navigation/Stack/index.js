import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ScreenRevisions from 'app/js/screens/ScreenRevisions';
import ScreenWelcome from "app/js/screens/ScreenWelcome";
import ScreenLanguage from "app/js/screens/ScreenLanguage";
// import ScreenQuranBrowser from 'app/js/screens/ScreenQuranBrowser';
// import ScreenRevisionDetails from 'app/js/screens/ScreenRevisionDetails';
// import ScreenSettings from 'app/js/screens/ScreenSettings';
import reduxStore from "app/js/redux/reduxStore";
import BottomNav from "../BottomTabs";
import Header from "app/components/Header";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        // header: () => getHeaderComponent(),
        headerShown: false,
      }}
    >
      {reduxStore.getState().bIsFirstRun ? (
        <Stack.Screen
          name="ScrLang"
          component={ScreenLanguage}
          options={{
            headerShown: true,
            header: () => <Header empty={true} />,
          }}
        />
      ) : null}
      {reduxStore.getState().bSkipWelcome == false ? (
        <Stack.Screen
          name="ScrWelcome"
          component={ScreenWelcome}
          options={{
            headerShown: true,
            header: () => <Header title={"Welcome"} showIcon={false} />,
          }}
        />
      ) : null}
      <Stack.Screen name="Home" component={BottomNav} />

      {/* <Stack.Screen name="ScrList" component={ScreenRevisions} />
      <Stack.Screen name="ScrRev" component={ScreenRevisionDetails} />
      <Stack.Screen name="ScrQuran" component={ScreenQuranBrowser} />
      <Stack.Screen name="ScrSettings" component={ScreenSettings} /> */}
    </Stack.Navigator>
  );
}
