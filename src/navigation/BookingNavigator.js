import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// List screen (tabs visible)
import BookingListScreen from "../screens/booking/BookingListScreen";

// YOUR booking flow (tabs hidden — full screen)
import HotelDetails from "../screens/booking/HotelDetails";
import Booking from "../screens/booking/Booking";
import SelectDate from "../screens/booking/SelectDate";
import Payment from "../screens/booking/Payment";
import BookingSuccess from "../screens/booking/BookingSuccess";

const Stack = createNativeStackNavigator();

export default function BookingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      {/* List — tabs visible */}
      <Stack.Screen name="BookingListScreen" component={BookingListScreen} />
      
      {/* YOUR flow — tabs hidden (full screen) */}
      <Stack.Screen 
        name="HotelDetails" 
        component={HotelDetails}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen 
        name="Booking" 
        component={Booking}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen 
        name="SelectDate" 
        component={SelectDate}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen 
        name="Payment" 
        component={Payment}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen 
        name="BookingSuccess" 
        component={BookingSuccess}
        options={{ tabBarStyle: { display: "none" }, animation: "fade" }}
      />

       <Stack.Screen 
        name="Filter" 
        component={Filter}
        options={{ tabBarStyle: { display: "none" }, animation: "fade" }}
      />
    </Stack.Navigator>
  );
}