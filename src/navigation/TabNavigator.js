import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

import {
  House,
  Search,
  CalendarDays,
  User
} from "lucide-react-native";

import HomeNavigator from "./HomeNavigator";
import BookingNavigator from "./BookingNavigator";
import ProfileNavigator from "./ProfileNavigator";
import SearchNavigator from "./SearchNavigator";

const Tab = createBottomTabNavigator();


const TabIcon = ({ focused, label, theme }) => {

  const icons = {
    Home: House,
    Search: Search,
    Booking: CalendarDays,
    Profile: User,
  };

  const Icon = icons[label];

  return (
    <View style={styles.tabItem}>

      <Icon
        size={24}
        strokeWidth={focused ? 2.5 : 2}
        color={
          focused 
          ? theme.primary 
          : theme.textSecondary
        }
      />

      <Text
        style={[
          styles.tabLabel,
          {
            color: focused
              ? theme.primary
              : theme.textSecondary,

            fontWeight: focused
              ? "600"
              : "400",
          },
        ]}
      >
        {label}
      </Text>

    </View>
  );
};


export default function TabNavigator() {

  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarShowLabel:false,

        tabBarStyle:{
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderTopWidth:0.5,
          height:80,
          paddingBottom:12,
          paddingTop:8,
          elevation:8,
        },

        tabBarIcon:({focused})=>(
          <TabIcon
            focused={focused}
            label={route.name}
            theme={theme}
          />
        ),

      })}
    >

      <Tab.Screen 
        name="Home" 
        component={HomeNavigator} 
      />

      <Tab.Screen 
        name="Search" 
        component={SearchNavigator} 
      />

      <Tab.Screen 
        name="Booking" 
        component={BookingNavigator} 
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator} 
      />

    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({

  tabItem:{
    alignItems:"center",
    justifyContent:"center",

    // keeps icon + text together
    height:55,

    minWidth:60,
  },


  tabLabel:{
    fontSize:11,

    // creates space between icon and text
    marginTop:4,

    textAlign:"center",
  },

});