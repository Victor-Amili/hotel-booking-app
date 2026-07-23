import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ResetPassword() {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  
  // Modal State
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleContinue = () => {
    if (!password || !confirmPassword) {
      setError('Please fill in both fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    // TODO: call your API here to actually update the password

    // Show the success modal when conditions are met
    setIsSuccessModalVisible(true);
  };

  const handleGoToHomepage = () => {
    setIsSuccessModalVisible(false);
    // Replace 'Home' with your main screen/navigation route name (e.g. 'Login' or 'Home')
    navigation.navigate('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Password</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Lock icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.lockCircle}>
          <Ionicons name="lock-closed" size={40} color="#4B5563" />
        </View>
      </View>

      <Text style={styles.sectionLabel}>Create Your New Password</Text>

      {/* New password field */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="New password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm password field */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons
            name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Remember me */}
      <TouchableOpacity
        style={styles.rememberRow}
        onPress={() => setRememberMe(!rememberMe)}
      >
        <Ionicons
          name={rememberMe ? 'checkbox' : 'square-outline'}
          size={20}
          color={rememberMe ? '#10B981' : '#9CA3AF'}
        />
        <Text style={styles.rememberText}>Remember me</Text>
      </TouchableOpacity>

      {/* Continue button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* ================= SUCCESS MODAL POPUP ================= */}
      <Modal
        visible={isSuccessModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            
            {/* Graphic Container with Confetti Dots */}
            <View style={styles.graphicContainer}>
              {/* Confetti Dots */}
              <View style={[styles.dot, styles.dotTopCenter]} />
              <View style={[styles.dot, styles.dotTopRight]} />
              <View style={[styles.dot, styles.dotMiddleRight]} />
              <View style={[styles.dot, styles.dotBottomRight]} />
              <View style={[styles.dot, styles.dotBottomCenter]} />
              <View style={[styles.dot, styles.dotMiddleLeft]} />
              <View style={[styles.dot, styles.dotTopLeft]} />

              {/* Main Center Circle */}
              <View style={styles.mainCircle}>
                <Ionicons name="checkbox-outline" size={42} color="#000000" />
              </View>
            </View>

            {/* Text Message */}
            <Text style={styles.modalTitle}>Congratulations !</Text>
            <Text style={styles.modalSubtitle}>Your account is ready to use</Text>

            {/* Go to Homepage Button */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleGoToHomepage}
              activeOpacity={0.85}
            >
              <Text style={styles.modalButtonText}>Go to Home page</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

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
    fontSize: 17,
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
  sectionLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginBottom: 10,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
  continueButton: {
    backgroundColor: '#10B981',
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

  /* Success Modal Styling */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 28,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  graphicContainer: {
    width: 200,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  mainCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#10B981',
    borderRadius: 50,
  },
  dotTopCenter: {
    width: 10,
    height: 10,
    top: 10,
  },
  dotTopRight: {
    width: 24,
    height: 24,
    top: 28,
    right: 20,
  },
  dotMiddleRight: {
    width: 12,
    height: 12,
    right: 32,
    top: 90,
  },
  dotBottomRight: {
    width: 22,
    height: 22,
    bottom: 22,
    right: 24,
  },
  dotBottomCenter: {
    width: 10,
    height: 10,
    bottom: 12,
  },
  dotMiddleLeft: {
    width: 22,
    height: 22,
    left: 18,
    bottom: 38,
  },
  dotTopLeft: {
    width: 12,
    height: 12,
    left: 20,
    top: 65,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 28,
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 28,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});