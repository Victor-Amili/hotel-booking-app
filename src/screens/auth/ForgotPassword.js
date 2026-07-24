import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from "../../context/themecontext"; // Adjust path if necessary

export default function ResetPassword() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  // tracks which contact method is selected: 'sms' or 'email'
  const [selectedMethod, setSelectedMethod] = useState('sms');

  const handleContinue = () => {
    // pass the chosen method (and masked contact) to the next screen
    navigation.navigate('OTP', {
      method: selectedMethod,
      contact: selectedMethod === 'sms' ? '+9705994*****99' : 'shady****@gmail.com',
    });
  };

  // Determine if we are in light mode for the subtle green selection background
  const isLightMode = theme.background === '#FFFFFF' || theme.background === '#FFF';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background, paddingTop: 50 }]}>
      <StatusBar 
        barStyle={isLightMode ? "dark-content" : "light-content"} 
        backgroundColor={theme.background} 
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Forgot Password</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Lock icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.lockCircle}>
          <Ionicons name="lock-closed" size={40} color="#4B5563" />
        </View>
      </View>

      {/* Description */}
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        Select which contact details should we use to reset your password
      </Text>

      {/* SMS option */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          { backgroundColor: theme.backgroundSecondary, borderColor: theme.backgroundSecondary },
          selectedMethod === 'sms' && { 
            borderColor: theme.primary, 
            backgroundColor: isLightMode ? '#F0FDF4' : 'rgba(34, 197, 94, 0.15)' 
          },
        ]}
        onPress={() => setSelectedMethod('sms')}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={22} color={theme.textSecondary} />
        <View style={styles.optionTextWrapper}>
          <Text style={[styles.optionLabel, { color: theme.textSecondary }]}>via SMS</Text>
          <Text style={[styles.optionValue, { color: theme.text }]}>+9705994*****99</Text>
        </View>
      </TouchableOpacity>

      {/* Email option */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          { backgroundColor: theme.backgroundSecondary, borderColor: theme.backgroundSecondary },
          selectedMethod === 'email' && { 
            borderColor: theme.primary, 
            backgroundColor: isLightMode ? '#F0FDF4' : 'rgba(34, 197, 94, 0.15)' 
          },
        ]}
        onPress={() => setSelectedMethod('email')}
        activeOpacity={0.8}
      >
        <Ionicons name="mail-outline" size={22} color={theme.textSecondary} />
        <View style={styles.optionTextWrapper}>
          <Text style={[styles.optionLabel, { color: theme.textSecondary }]}>via Email</Text>
          <Text style={[styles.optionValue, { color: theme.text }]}>shady****@gmail.com</Text>
        </View>
      </TouchableOpacity>

      {/* Continue button */}
      <TouchableOpacity 
        style={[styles.continueButton, { backgroundColor: theme.primary }]} 
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconWrapper: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  lockCircle: {
    width: 110,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 14,
  },
  optionTextWrapper: {
    marginLeft: 12,
  },
  optionLabel: {
    fontSize: 13,
  },
  optionValue: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});