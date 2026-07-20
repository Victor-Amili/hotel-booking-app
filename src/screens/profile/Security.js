import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const Security = ({ navigation }) => {
  // Toggle states matching your UI mockup
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [isRememberMeEnabled, setIsRememberMeEnabled] = useState(true);
  const [isTouchIDEnabled, setIsTouchIDEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <ArrowLeft color="#000000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
      </View>

      {/* Security Options List */}
      <View style={styles.content}>
        
        {/* Face ID Row */}
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Face ID</Text>
          <Switch
            trackColor={{ false: '#E4E4E7', true: '#10B981' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E4E4E7"
            onValueChange={setIsFaceIDEnabled}
            value={isFaceIDEnabled}
          />
        </View>

        {/* Remember me Row */}
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Remmber me</Text>
          <Switch
            trackColor={{ false: '#E4E4E7', true: '#10B981' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E4E4E7"
            onValueChange={setIsRememberMeEnabled}
            value={isRememberMeEnabled}
          />
        </View>

        {/* Touch ID Row */}
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Touch ID</Text>
          <Switch
            trackColor={{ false: '#E4E4E7', true: '#10B981' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E4E4E7"
            onValueChange={setIsTouchIDEnabled}
            value={isTouchIDEnabled}
          />
        </View>

        {/* Change Password Action Button */}
        <TouchableOpacity 
          style={styles.changePasswordButton} 
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
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
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
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18181B',
  },
  changePasswordButton: {
    backgroundColor: '#10B981', // Brand theme green matching your UI
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