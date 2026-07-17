import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

/**
 * HeaderLayout - Reusable screen header
 * 
 * Props:
 * - title: string
 * - showBackButton: boolean (default: true)
 * - onBackPress: function
 * - rightIcon: React element
 * - onRightPress: function
 * - transparent: boolean (default: false)
 */
const HeaderLayout = ({
  title,
  showBackButton = true,
  onBackPress,
  rightIcon,
  onRightPress,
  transparent = false,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: transparent ? "transparent" : theme.background,
          borderBottomColor: transparent ? "transparent" : theme.border,
        },
      ]}
    >
      <View style={styles.left}>
        {showBackButton && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.backIcon, { color: theme.text }]}>←</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <Text
          style={[styles.title, { color: theme.text }]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={styles.right}>
        {rightIcon ? (
          <TouchableOpacity
            onPress={onRightPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    minHeight: 56,
  },
  left: {
    width: 40,
    alignItems: "flex-start",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  right: {
    width: 40,
    alignItems: "flex-end",
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: "400",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HeaderLayout;