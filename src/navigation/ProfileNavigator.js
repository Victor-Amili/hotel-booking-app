import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/profile/Profile";
import EditProfile from "../screens/profile/EditProfile";
import Notifications from "../screens/profile/Notifications";
import Payment from "../screens/booking/Payment";
import Security from "../screens/profile/Security";
import Help from "../screens/profile/Help";

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
}


