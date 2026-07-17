import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

// Each tab is its own stack
import HomeNavigator from "./HomeNavigator";
import BookingNavigator from "./BookingNavigator";
import ProfileNavigator from "./ProfileNavigator";
import SearchNavigator from "./SearchNavigator";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, label, theme }) => {
  const icons = {
    Home: "🏠",
    Search: "🔍",
    Booking: "📅",
    Profile: "👤",
  };

  return (
    <View style={styles.tabItem}>
      <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
        {icons[label] || "●"}
      </Text>
      <Text
        style={[
          styles.tabLabel,
          {
            color: focused ? theme.primary : theme.textSecondary,
            fontWeight: focused ? "600" : "400",
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
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderTopWidth: 0.5,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
          elevation: 8,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} label={route.name} theme={theme} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen name="Booking" component={BookingNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
  },
});