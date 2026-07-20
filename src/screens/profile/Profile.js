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

export default function ProfileScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  // Profile Menu Items Configuration
  const menuItems = [
    { id: '1', title: 'Edit Profile', icon: User, onPress: () => navigation.navigate('EditProfile') },
    { id: '2', title: 'Payment', icon: CreditCard, onPress: () => {} },
    { id: '3', title: 'Notifications', icon: Bell, onPress: () => navigation.navigate('Notifications') },
    { id: '4', title: 'Security', icon: ShieldCheck, onPress: () => navigation.navigate('Security') },
    { id: '5', title: 'Help', icon: Info, onPress: () => navigation.navigate('Help')},
  ];

  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);
    navigation?.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* User Avatar & Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../../assets/user.png')} // Replace with your avatar image
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.userName}>Ronald Richards</Text>
          <Text style={styles.userEmail}>debbie.baker@example.com</Text>
        </View>

        {/* Section Separator Line */}
        <View style={styles.divider} />

        {/* Menu Navigation Items */}
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
                  <IconComponent color="#27272A" size={22} style={styles.menuIcon} />
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Dark Theme Toggle Item */}
          <View style={styles.menuItem}>
            <View style={styles.toggleLeft}>
              <Sun color="#27272A" size={22} style={styles.menuIcon} />
              <Text style={styles.menuText}>Dark Theme</Text>
            </View>
            <Switch
              trackColor={{ false: '#E4E4E7', true: '#10B981' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E4E4E7"
              onValueChange={toggleSwitch}
              value={isDarkMode}
            />
          </View>

          {/* Logout Button (Triggers Custom Modal) */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setIsLogoutModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <LogOut color="#EF4444" size={22} style={styles.menuIcon} />
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* ================= LOGOUT CONFIRMATION MODAL ================= */}
      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsLogoutModalVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.bottomSheetContainer}
          >
            {/* Top Green Pill Handle Indicator */}
            <View style={styles.dragHandle} />

            {/* Title */}
            <Text style={styles.modalTitle}>Logout</Text>

            {/* Separator Divider */}
            <View style={styles.modalDivider} />

            {/* Message */}
            <Text style={styles.modalMessage}>Are you sure want to log out ?</Text>

            {/* Yes, Logout Button */}
            <TouchableOpacity
              style={styles.confirmLogoutButton}
              onPress={handleConfirmLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmLogoutText}>Yes , Logout</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsLogoutModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#FDE047',
    padding: 3,
    marginBottom: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  menuContainer: {
    paddingHorizontal: 24,
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
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18181B',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },

  /* Bottom Sheet Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
    alignItems: 'center',
  },
  dragHandle: {
    width: 38,
    height: 4,
    backgroundColor: '#10B981',
    borderRadius: 2,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#EF4444',
    marginBottom: 16,
  },
  modalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 24,
    textAlign: 'center',
  },
  confirmLogoutButton: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 28,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmLogoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#333333',
    borderRadius: 28,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});