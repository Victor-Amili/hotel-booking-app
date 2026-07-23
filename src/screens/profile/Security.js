import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  Platform
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
// Import Theme Context
import { useTheme } from "../../context/themecontext";

const Security = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  // Toggle states matching your UI mockup
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [isRememberMeEnabled, setIsRememberMeEnabled] = useState(true);
  const [isTouchIDEnabled, setIsTouchIDEnabled] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Security</Text>
      </View>

      {/* Security Options List */}
      <View style={styles.content}>
        
        {/* Face ID Row */}
        <View style={[styles.settingRow, { borderBottomColor: isDark ? '#27272A' : '#F4F4F5' }]}>
          <Text style={[styles.settingText, { color: theme.text }]}>Face ID</Text>
          <Switch
            trackColor={{ 
              false: isDark ? '#3F3F46' : '#E4E4E7', 
              true: theme.primary 
            }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={isDark ? '#3F3F46' : '#E4E4E7'}
            onValueChange={setIsFaceIDEnabled}
            value={isFaceIDEnabled}
          />
        </View>

        {/* Remember me Row */}
        <View style={[styles.settingRow, { borderBottomColor: isDark ? '#27272A' : '#F4F4F5' }]}>
          <Text style={[styles.settingText, { color: theme.text }]}>Remember me</Text>
          <Switch
            trackColor={{ 
              false: isDark ? '#3F3F46' : '#E4E4E7', 
              true: theme.primary 
            }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={isDark ? '#3F3F46' : '#E4E4E7'}
            onValueChange={setIsRememberMeEnabled}
            value={isRememberMeEnabled}
          />
        </View>

        {/* Touch ID Row */}
        <View style={[styles.settingRow, { borderBottomColor: isDark ? '#27272A' : '#F4F4F5' }]}>
          <Text style={[styles.settingText, { color: theme.text }]}>Touch ID</Text>
          <Switch
            trackColor={{ 
              false: isDark ? '#3F3F46' : '#E4E4E7', 
              true: theme.primary 
            }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={isDark ? '#3F3F46' : '#E4E4E7'}
            onValueChange={setIsTouchIDEnabled}
            value={isTouchIDEnabled}
          />
        </View>

        {/* Change Password Action Button */}
        <TouchableOpacity 
          style={[styles.changePasswordButton, { backgroundColor: theme.primary }]} 
          activeOpacity={0.8}
          onPress={() => navigation?.navigate('ResetPassword')}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  changePasswordButton: {
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Security;