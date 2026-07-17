import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

// Auth stack (no tabs)
import AuthNavigator from "./AuthNavigator";

// Main app (with tabs)
import TabNavigator from "./TabNavigator";

export default function AppNavigator() {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}