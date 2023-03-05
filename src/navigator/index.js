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
import {Colors, Typo} from '../styles';
import TopUpScreen from '../screens/topup';
import TopUpDetailScreen from '../screens/topupdetail';
import SendScreen from '../screens/send';
import ContactScreen from '../screens/contacts';
import {headerVisibility} from '../utils/utils';
import TransactionDetailScreen from '../screens/transactiondetail';
import RequestScreen from '../screens/request';
import HistoryScreen from '../screens/history';
import InboxScreen from '../screens/inbox';
import PulsaDataScreen from '../screens/pulsadata';
import ChangePINScreen from '../screens/changepin';
import VerifyAccountScreen from '../screens/verifyaccount';
import VerifyIDCardScreen from '../screens/verifyidcard';
import VerifySelfieScreen from '../screens/verifyselfie';
import VerifyDoneScreen from '../screens/verifydone';
import PlnScreen from '../screens/pln';
import PlnTokenScreen from '../screens/plntoken';
import PlnTagihanScreen from '../screens/plntagihan';
import BPJSScreen from '../screens/bpjs';

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
        component={HistoryStack}
        options={{
          headerShown: false,
          title: 'History',
        }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
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
      <Stack.Screen
        name="Request"
        component={RequestStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Inbox"
        component={InboxStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PulsaData"
        component={PulsaDataStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PLN"
        component={PLNStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BPJS"
        component={BPJSStack}
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
      <Stack.Screen
        name="PinModal"
        component={PinModalScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_bottom',
          animationDuration: 5,
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
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

// =============== REQUEST STACK
const RequestStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RequestInit"
        component={RequestScreen}
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
      <Stack.Screen
        name="PinModal"
        component={PinModalScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_bottom',
          animationDuration: 5,
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
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

// =============== PROFILE STACK
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileInit"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="ChangePIN"
        component={ChangePinStack}
        options={{
          title: '',
          headerShown: false,
          headerShadowVisible: false,
          animationDuration: 5,
        }}
      />
      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccountStack}
        options={{
          title: '',
          headerShown: false,
          headerShadowVisible: false,
          animationDuration: 5,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== VERIFY ACCOUNT STACK
const VerifyAccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VerifyAccountInit"
        component={VerifyAccountScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="VerifyIDCard"
        component={VerifyIDCardScreen}
        options={{
          title: 'Upload Foto KTP',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="VerifySelfie"
        component={VerifySelfieScreen}
        options={{
          title: 'Upload Foto Selfie',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="VerifyDone"
        component={VerifyDoneScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
    </Stack.Navigator>
  );
};

// =============== CHANGE PIN STACK
const ChangePinStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChangePINInit"
        component={ChangePINScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="PinModal"
        component={PinModalScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_bottom',
          animationDuration: 5,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== HISTORY STACK
const HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryInit"
        component={HistoryScreen}
        options={{
          title: 'History',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_right',
          animationDuration: 100,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== NOTIFICATION STACK
const NotificationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationInit"
        component={HistoryScreen}
        options={{
          title: 'Notifikasi',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_right',
          animationDuration: 100,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== INBOX STACK
const InboxStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InboxInit"
        component={InboxScreen}
        options={{
          title: 'Inbox',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="Transfer"
        component={SendStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== PULSA DATA STACK
const PulsaDataStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PulsaDataInit"
        component={PulsaDataScreen}
        options={{
          title: 'Pulsa & Paket Data',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
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
      <Stack.Screen
        name="PinModal"
        component={PinModalScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_bottom',
          animationDuration: 5,
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_right',
          animationDuration: 100,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== PLN STACK
const PLNStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PLNInit"
        component={PlnScreen}
        options={{
          title: 'PLN',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="PLNToken"
        component={PlnTokenScreen}
        options={{
          title: 'PLN',
          headerShadowVisible: false,
          animation: 'slide_from_right',
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="PLNTagihan"
        component={PlnTagihanScreen}
        options={{
          title: 'PLN',
          headerShadowVisible: false,
          animation: 'slide_from_right',
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
      <Stack.Screen
        name="PinModal"
        component={PinModalScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_bottom',
          animationDuration: 5,
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          animation: 'slide_from_right',
          animationDuration: 100,
        }}
      />
    </Stack.Navigator>
  );
};

// =============== BPJS STACK
const BPJSStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BPJSInit"
        component={BPJSScreen}
        options={{
          title: 'BPJS Kesehatan',
          headerShadowVisible: false,
          headerTitleStyle: {
            ...Typo.TextLargeBold,
          },
        }}
      />
    </Stack.Navigator>
  );
};
