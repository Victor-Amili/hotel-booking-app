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

export default function Login() {
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    // TODO: Add your login authentication logic here
    navigation.replace('MainApp'); // Navigate to main app
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>
          Login to your{'\n'}Account
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

        {/* Sign In Button */}
        <TouchableOpacity 
          style={[styles.signInButton, { backgroundColor: theme.primary }]} 
          onPress={handleSignIn}
          activeOpacity={0.8}
        >
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Forgot Password Link */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotButton}
        >
          <Text style={[styles.forgotText, { color: theme.primary }]}>Forgot the password ?</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: isDark ? '#27272A' : '#E5E7EB' }]} />
          <Text style={[styles.dividerText, { color: theme.textSecondary || '#6B7280' }]}>or continue with</Text>
          <View style={[styles.dividerLine, { backgroundColor: isDark ? '#27272A' : '#E5E7EB' }]} />
        </View>

        {/* Social Login Buttons */}
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

        {/* Sign Up Link */}
        <View style={styles.footerRow}>
          <Text style={[styles.footerText, { color: theme.textSecondary || '#6B7280' }]}>
            Don't have an account ?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={[styles.signUpText, { color: theme.primary }]}>Sign up</Text>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
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
  signInButton: {
    width: '100%',
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  forgotButton: {
    marginBottom: 32,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
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
  signUpText: {
    fontSize: 14,
    fontWeight: '700',
  },
});