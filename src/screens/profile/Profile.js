import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  Modal
} from 'react-native';
import {
  User,
  CreditCard,
  Bell,
  ShieldCheck,
  Info,
  Sun,
  LogOut
} from 'lucide-react-native';
import { useTheme } from "../../context/themecontext";

export default function ProfileScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const menuItems = [
    { id: '1', title: 'Edit Profile', icon: User, onPress: () => navigation.navigate('EditProfile') },
    { id: '2', title: 'Payment', icon: CreditCard, onPress: () => navigation.navigate('Payment') },
    { id: '3', title: 'Notifications', icon: Bell, onPress: () => navigation.navigate('Notifications') },
    { id: '4', title: 'Security', icon: ShieldCheck, onPress: () => navigation.navigate('Security') },
    { id: '5', title: 'Help', icon: Info, onPress: () => navigation.navigate('Help')},
  ];

  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);
    navigation?.replace('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={theme.background} />

      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.profileSection}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.primaryLight }]}>
            <Image
              source={require('../../../assets/user.png')}
              style={styles.avatarImage}
            />
          </View>
          <Text style={[styles.userName, { color: theme.text }]}>Ronald Richards</Text>
          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>debbie.baker@example.com</Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.menuLeft}>
                  <IconComponent color={theme.text} size={22} style={styles.menuIcon} />
                  <Text style={[styles.menuText, { color: theme.text }]}>{item.title}</Text>
                </View>
                <Text style={{ color: theme.textSecondary }}>›</Text>
              </TouchableOpacity>
            );
          })}

          {/* Dark Theme Toggle */}
          <View style={styles.menuItem}>
            <View style={styles.toggleLeft}>
              <Sun color={theme.text} size={22} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: theme.text }]}>Dark Theme</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={isDark ? theme.primary : '#f4f3f4'}
            />
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setIsLogoutModalVisible(true)}
            activeOpacity={0.7}
          >
            <LogOut color={theme.error} size={22} style={styles.menuIcon} />
            <Text style={[styles.logoutText, { color: theme.error }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLogoutModalVisible}
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Logout</Text>
            <Text style={[styles.modalMessage, { color: theme.textSecondary }]}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { borderColor: theme.border }]}
                onPress={() => setIsLogoutModalVisible(false)}
              >
                <Text style={{ color: theme.text }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, { backgroundColor: theme.error }]}
                onPress={handleConfirmLogout}
              >
                <Text style={{ color: '#FFF' }}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginBottom: 24,
  },
  menuContainer: {
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmButton: {},
});