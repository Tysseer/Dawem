import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenWelcome from 'app/js/screens/ScreenWelcome';
import ScreenLanguage from 'app/js/screens/ScreenLanguage';
import reduxStore from 'app/js/redux/reduxStore';
import BottomNav from '../BottomTabs';
import Header from 'app/components/Header';
import { useSelector } from 'react-redux';
import StringsManager from 'js/helpers/StringsManager';
import * as strings from 'js/helpers/StringsManager';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  let stringsManager = new StringsManager();
  const strLang = useSelector((state) => state.strLang);
  stringsManager.setLanguage(strLang);
  return (
    <Stack.Navigator
      screenOptions={{
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
            header: () => (
              <Header
                lang={{ strLang }}
                title={stringsManager.getStr(strings.STR_WELCOME)}
                showIcon={false}
              />
            ),
          }}
        />
      ) : null}
      <Stack.Screen name="Home" component={BottomNav} />
    </Stack.Navigator>
  );
}
