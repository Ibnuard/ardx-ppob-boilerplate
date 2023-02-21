import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import LoginScreen from '../screens/login';
import SplashScreen from '../screens/splash';
import OnBoardingScreen from '../screens/onboarding';
import RegisterScreen from '../screens/register';
import PinModalScreen from '../components/pin';
import ForgotPinOTPScreen from '../screens/forgotpinotp';

//create stack screen
const Stack = createNativeStackNavigator();

//create bottom tab
const Tab = createBottomTabNavigator();

//===================================
// ========== GAP ===================
// ==================================

export const SplashStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Boarding"
        component={OnBoardingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

//auth stack screen
export const AuthStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PinModal"
        component={PinModalScreen}
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ForgotPin"
        component={ForgotPinOTPScreen}
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

//tab stack screen
export const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
