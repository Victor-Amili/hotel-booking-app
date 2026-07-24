import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from "../../context/themecontext"; // Adjust path if necessary

const CODE_LENGTH = 4;
const RESEND_SECONDS = 55;

export default function OTP() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  // contact info passed from ForgotPassword screen, with a fallback for testing
  const contact = route.params?.contact || '+9705994*****99';

  const [code, setCode] = useState([]); // array of digits typed so far
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setSecondsLeft(RESEND_SECONDS);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleKeyPress = (key) => {
    if (key === 'delete') {
      setCode((prev) => prev.slice(0, -1));
      return;
    }
    if (key === '*') return; // not a digit, ignore

    if (code.length < CODE_LENGTH) {
      const newCode = [...code, key];
      setCode(newCode);

      // auto-submit once all boxes are filled
      if (newCode.length === CODE_LENGTH) {
        handleVerify(newCode.join(''));
      }
    }
  };

  const handleVerify = (fullCode) => {
    // TODO: call your API here to verify the code
    navigation.navigate('ResetPassword');
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    // TODO: call your API here to resend the code
    setCode([]);
    startTimer();
  };

  const keypadRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', 'delete'],
  ];

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

      {/* Info text */}
      <Text style={[styles.infoText, { color: theme.textSecondary }]}>
        code has been send to {contact}
      </Text>

      {/* Code boxes */}
      <View style={styles.codeRow}>
        {Array.from({ length: CODE_LENGTH }).map((_, index) => {
          const digit = code[index];
          const isActive = index === code.length;
          return (
            <View
              key={index}
              style={[
                styles.codeBox,
                { backgroundColor: theme.backgroundSecondary },
                isActive && [
                  styles.codeBoxActive,
                  { 
                    borderColor: theme.primary,
                    backgroundColor: isLightMode ? '#F0FDF4' : 'rgba(34, 197, 94, 0.15)'
                  }
                ],
              ]}
            >
              <Text style={[styles.codeDigit, { color: theme.text }]}>{digit || ''}</Text>
            </View>
          );
        })}
      </View>

      {/* Resend */}
      <TouchableOpacity onPress={handleResend} disabled={secondsLeft > 0}>
        <Text style={[styles.resendText, { color: theme.primary }]}>
          {secondsLeft > 0 ? `Resend code ${secondsLeft} s` : 'Resend code'}
        </Text>
      </TouchableOpacity>

      {/* Custom numeric keypad */}
      <View style={[styles.keypad, { backgroundColor: theme.backgroundSecondary }]}>
        {keypadRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keypadKey}
                onPress={() => handleKeyPress(key)}
                disabled={key === '*'}
              >
                {key === 'delete' ? (
                  <Ionicons name="backspace-outline" size={22} color={theme.text} />
                ) : (
                  <Text style={[
                    styles.keypadKeyText, 
                    { color: theme.text },
                    key === '*' && { opacity: 0.3 }
                  ]}>
                    {key}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
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
  infoText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 60,
    marginBottom: 40,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  codeBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  codeBoxActive: {
    borderWidth: 1.5,
  },
  codeDigit: {
    fontSize: 20,
    fontWeight: '700',
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  keypad: {
    marginTop: 'auto',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    // Add margin trick if your main container has padding but keypad should reach edges
    marginHorizontal: -20, 
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  keypadKey: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  keypadKeyText: {
    fontSize: 22,
    fontWeight: '500',
  },
});