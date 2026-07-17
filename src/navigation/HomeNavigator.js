import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Toluwani's screens
import Home from "../screens/home/Home";
import Search from "../screens/home/Search";
import RecentlyBooked from "../screens/home/RecentlyBooked";
import Bookmarks from "../screens/home/Bookmarks";

// YOUR screen — entry point from home
import HotelDetails from "../screens/booking/HotelDetails";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="RecentlyBooked" component={RecentlyBooked} />
      <Stack.Screen name="Bookmarks" component={Bookmarks} />
      
      {/* From home, user taps hotel → goes to HotelDetails */}
      <Stack.Screen name="HotelDetails" component={HotelDetails} />
    </Stack.Navigator>
  );
}


