import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Import Theme Context
import { useTheme } from "../../context/themecontext";

export default function Signup() {
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignUp = () => {
    // TODO: Add your registration API logic here
    navigation.navigate('FillProfile'); // Navigate to profile setup or home screen
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      {/* Top Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>
          Create Your{'\n'}Account
        </Text>

        {/* Email Input */}
        <View style={[
          styles.inputContainer, 
          { backgroundColor: theme.card || theme.backgroundSecondary || '#F8F9FA' }
        ]}>
          <Ionicons name="mail-outline" size={20} color={theme.textSecondary || "#9CA3AF"} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Email"
            placeholderTextColor={theme.textSecondary || "#9CA3AF"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={[
          styles.inputContainer, 
          { backgroundColor: theme.card || theme.backgroundSecondary || '#F8F9FA' }
        ]}>
          <Ionicons name="lock-closed-outline" size={20} color={theme.textSecondary || "#9CA3AF"} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Password"
            placeholderTextColor={theme.textSecondary || "#9CA3AF"}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={theme.textSecondary || "#9CA3AF"}
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me Checkbox */}
        <TouchableOpacity
          style={styles.rememberRow}
          onPress={() => setRememberMe(!rememberMe)}
          activeOpacity={0.8}
        >
          <View style={[
            styles.checkbox, 
            { borderColor: theme.primary },
            rememberMe && { backgroundColor: theme.primary }
          ]}>
            {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text style={[styles.rememberText, { color: theme.text }]}>Remember me</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.signUpButton, { backgroundColor: theme.primary }]} 
          onPress={handleSignUp}
          activeOpacity={0.8}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: isDark ? '#27272A' : '#E5E7EB' }]} />
          <Text style={[styles.dividerText, { color: theme.textSecondary || '#6B7280' }]}>or continue with</Text>
          <View style={[styles.dividerLine, { backgroundColor: isDark ? '#27272A' : '#E5E7EB' }]} />
        </View>

        {/* Social Registration Options */}
        <View style={styles.socialRow}>
          {/* Facebook */}
          <TouchableOpacity 
            style={[
              styles.socialButton, 
              { 
                backgroundColor: theme.card || theme.backgroundSecondary || '#F8F9FA',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#F3F4F6'
              }
            ]} 
            activeOpacity={0.8}
          >
            <Ionicons name="logo-facebook" size={26} color="#1877F2" />
          </TouchableOpacity>

          {/* Google */}
          <TouchableOpacity 
            style={[
              styles.socialButton, 
              { 
                backgroundColor: theme.card || theme.backgroundSecondary || '#F8F9FA',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#F3F4F6'
              }
            ]} 
            activeOpacity={0.8}
          >
            <Ionicons name="logo-google" size={24} color="#EA4335" />
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity 
            style={[
              styles.socialButton, 
              { 
                backgroundColor: theme.card || theme.backgroundSecondary || '#F8F9FA',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#F3F4F6'
              }
            ]} 
            activeOpacity={0.8}
          >
            <Ionicons name="logo-apple" size={26} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Already Have an Account Link */}
        <View style={styles.footerRow}>
          <Text style={[styles.footerText, { color: theme.textSecondary || '#6B7280' }]}>
            Already have an account ?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.signInText, { color: theme.primary }]}>Sign in</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Top safe padding added for status bar cross-platform consistency
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 12,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    width: '100%',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: '600',
  },
  signUpButton: {
    width: '100%',
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 36,
  },
  socialButton: {
    width: 64,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  signInText: {
    fontSize: 14,
    fontWeight: '700',
  },
});