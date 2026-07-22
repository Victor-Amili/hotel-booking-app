import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ResetPassword() {
  const navigation = useNavigation();

  // tracks which contact method is selected: 'sms' or 'email'
  const [selectedMethod, setSelectedMethod] = useState('sms');

  const handleContinue = () => {
    // pass the chosen method (and masked contact) to the next screen
    navigation.navigate('VerifyCode', {
      method: selectedMethod,
      contact: selectedMethod === 'sms' ? '+9705994*****99' : 'shady****@gmail.com',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Lock icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.lockCircle}>
          <Ionicons name="lock-closed" size={40} color="#4B5563" />
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Select which contact details should we use to reset your password
      </Text>

      {/* SMS option */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedMethod === 'sms' && styles.optionCardSelected,
        ]}
        onPress={() => setSelectedMethod('sms')}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#555" />
        <View style={styles.optionTextWrapper}>
          <Text style={styles.optionLabel}>via SMS</Text>
          <Text style={styles.optionValue}>+9705994*****99</Text>
        </View>
      </TouchableOpacity>

      {/* Email option */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedMethod === 'email' && styles.optionCardSelected,
        ]}
        onPress={() => setSelectedMethod('email')}
      >
        <Ionicons name="mail-outline" size={22} color="#555" />
        <View style={styles.optionTextWrapper}>
          <Text style={styles.optionLabel}>via Email</Text>
          <Text style={styles.optionValue}>shady****@gmail.com</Text>
        </View>
      </TouchableOpacity>

      {/* Continue button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#222',
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
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    padding: 14,
    marginBottom: 14,
  },
  optionCardSelected: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  optionTextWrapper: {
    marginLeft: 12,
  },
  optionLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  optionValue: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: '#22C55E',
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