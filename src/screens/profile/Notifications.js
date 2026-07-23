import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  ScrollView,
  Platform
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
// Import Theme Context
import { useTheme } from "../../context/themecontext";

const Notifications = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  // Toggle states matching your UI design reference
  const [generalNotification, setGeneralNotification] = useState(true);
  const [sound, setSound] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [appUpdate, setAppUpdate] = useState(true);
  const [newServiceAvailable, setNewServiceAvailable] = useState(false);
  const [newTipsAvailable, setNewTipsAvailable] = useState(true);

  // Helper list for rendering clean, readable setting rows
  const notificationSettings = [
    {
      id: 'general',
      label: 'General Notification',
      value: generalNotification,
      onChange: setGeneralNotification,
    },
    {
      id: 'sound',
      label: 'Sound',
      value: sound,
      onChange: setSound,
    },
    {
      id: 'vibrate',
      label: 'Vibrate',
      value: vibrate,
      onChange: setVibrate,
    },
    {
      id: 'appUpdate',
      label: 'App Update',
      value: appUpdate,
      onChange: setAppUpdate,
    },
    {
      id: 'newService',
      label: 'New Service Available',
      value: newServiceAvailable,
      onChange: setNewServiceAvailable,
    },
    {
      id: 'newTips',
      label: 'New Tips Available',
      value: newTipsAvailable,
      onChange: setNewTipsAvailable,
    },
  ];

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Notification</Text>
      </View>

      {/* Notification Options List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {notificationSettings.map((item) => (
          <View key={item.id} style={[styles.settingRow, { borderBottomColor: isDark ? '#27272A' : '#F4F4F5' }]}>
            <Text style={[styles.settingText, { color: theme.text }]}>{item.label}</Text>
            <Switch
              trackColor={{ 
                false: isDark ? '#3F3F46' : '#E4E4E7', 
                true: theme.primary 
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={isDark ? '#3F3F46' : '#E4E4E7'}
              onValueChange={item.onChange}
              value={item.value}
            />
          </View>
        ))}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
    fontWeight: '500',
  },
});

export default Notifications;