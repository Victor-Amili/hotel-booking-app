import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from "../screens/home/Search";
import Filter from "../screens/booking/Filter";
import Bookmarks from "../screens/home/Bookmarks";

const Stack = createNativeStackNavigator();

export default function SearchNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Bookmarks" component={Bookmarks} />
    </Stack.Navigator>
  );
}