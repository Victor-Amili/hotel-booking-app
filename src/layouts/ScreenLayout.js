import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../hooks/useTheme";

/**
 * ScreenLayout - The main layout shell for every screen
 * 
 * Props:
 * - children: screen content
 * - scrollable: boolean (default: true)
 * - keyboardAvoiding: boolean (default: true)
 * - style: additional styles
 * - safeArea: boolean (default: true)
 * - padding: boolean (default: true)
 */
const ScreenLayout = ({
  children,
  scrollable = true,
  keyboardAvoiding = true,
  style,
  contentContainerStyle,
  safeArea = true,
  padding = true,
}) => {
  const { theme, isDark } = useTheme();

  const bgColor = theme.background;
  const barStyle = isDark ? "light-content" : "dark-content";

  const content = (
    <View
      style={[
        styles.container,
        { backgroundColor: bgColor },
        padding && { paddingHorizontal: 20 },
        style,
      ]}
    >
      {children}
    </View>
  );

  const scrollableContent = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
    >
      {content}
    </ScrollView>
  ) : (
    content
  );

  const keyboardContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.keyboardView, { backgroundColor: bgColor }]}
    >
      {scrollableContent}
    </KeyboardAvoidingView>
  ) : (
    scrollableContent
  );

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={bgColor} />
      {safeArea ? (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
          {keyboardContent}
        </SafeAreaView>
      ) : (
        keyboardContent
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default ScreenLayout;