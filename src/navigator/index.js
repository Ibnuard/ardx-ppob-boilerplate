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
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

//============== ICON
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../styles';
import TopUpScreen from '../screens/topup';
import TopUpDetailScreen from '../screens/topupdetail';
import SendScreen from '../screens/send';
import ContactScreen from '../screens/contacts';
import {headerVisibility} from '../utils/utils';

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
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'home-outline';
          } else if (route.name === 'HistoryStack') {
            iconName = 'history';
          } else {
            iconName = 'account-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.COLOR_PRIMARY,
        tabBarInactiveTintColor: Colors.COLOR_DESCRIPTION,
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (
            routeName === 'HomeInit' ||
            routeName === 'HistoryInit' ||
            routeName === 'ProfileInit' ||
            !routeName
          ) {
            return {display: 'flex'};
          } else {
            return {display: 'none'};
          }
        })(route),
      })}>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="HistoryStack"
        component={ProfileScreen}
        options={{
          title: 'History',
        }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// ==================== -- ==================================
//
// ================== GAP =========================
//
// ==========================================================

// ============== HOME STACK SCREEN
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeInit"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TopUp"
        component={TopUpStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Send"
        component={SendStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== TOPUP STACK
const TopUpStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopUpInit"
        component={TopUpScreen}
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="TopUpDetail"
        component={TopUpDetailScreen}
        options={{
          headerShown: true,
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_right',
          animationDuration: 100,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== SEND STACK
const SendStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SendInit"
        component={SendScreen}
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerShown: true,
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_right',
          animationDuration: 100,
        }}
      />
    </Stack.Navigator>
  );
};
