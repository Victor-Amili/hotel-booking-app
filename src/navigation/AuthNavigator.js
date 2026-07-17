import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/welcome/SplashScreen";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import WelcomeScreen1 from "../screens/welcome/WelcomeScreen1"
import WelcomeScreen2 from "../screens/welcome/WelcomeScreen2"
import WelcomeScreen3 from "../screens/welcome/WelcomeScreen3"
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import FillProfile from "../screens/auth/FillProfile";
import ForgotPassword from "../screens/auth/ForgotPassword";
import OTP from "../screens/auth/OTP";
import ResetPassword from "../screens/auth/ResetPassword";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
      <Stack.Screen name="WelcomeScreen1" component={WelcomeScreen1} />
      <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} />
      <Stack.Screen name="WelcomeScreen3" component={WelcomeScreen3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="FillProfile" component={FillProfile} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      {/* <Stack.Screen name="Success" component={Success} /> */}
    </Stack.Navigator>
  );
}