import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './Stack';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
