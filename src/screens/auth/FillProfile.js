import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  FlatList,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import { ArrowLeft, Calendar, Mail, ChevronDown, Search, X, CheckCircle, Camera } from 'lucide-react-native';

const FillProfile = ({ navigation }) => {
  // Profile Photo State
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop'
  );

  // Form Field States
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Palestine');
  const [countryCode, setCountryCode] = useState('+970');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Male');

  // API & Dropdown State
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');

  // Modal Visibility Controls
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  // Quick Date Picker State
  const [selectedDay, setSelectedDay] = useState('16');
  const [selectedMonth, setSelectedMonth] = useState('03');
  const [selectedYear, setSelectedYear] = useState('2004');

  const genderOptions = ['Male', 'Female', 'Rather not say'];

  // Helper function to determine max phone length
  const getPhoneMaxLength = (code) => {
    const exactLengths = {
      '+1': 10,   // US / Canada
      '+44': 10,  // UK
      '+91': 10,  // India
      '+970': 9,  // Palestine
      '+972': 9,  // Israel
      '+234': 10, // Nigeria
      '+61': 9,   // Australia
      '+20': 10,  // Egypt
      '+27': 9,   // South Africa
      '+86': 11,  // China
      '+81': 10,  // Japan
      '+49': 11,  // Germany
      '+33': 9,   // France
      '+971': 9,  // UAE
    };

    if (exactLengths[code]) {
      return exactLengths[code];
    }

    const codeDigitLength = code.replace('+', '').length;
    return 15 - codeDigitLength;
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const response = await fetch("https://www.apicountries.com/countries");
      const data = await response.json();

      if (!Array.isArray(data)) return;

      const parsedCountries = data
        .map((item) => {
          let code = "";
          if (item.callingCodes && item.callingCodes.length > 0) {
            code = `+${item.callingCodes[0].replace('+', '')}`;
          }
          return {
            name: item.name || "",
            code: code,
            cca2: item.alpha2Code || "",
          };
        })
        .filter((item) => item.name)
        .sort((a, b) => a.name.localeCompare(b.name));

      setCountries(parsedCountries);
    } catch (error) {
      console.log("Error fetching countries:", error);
    } finally {
      setLoadingCountries(false);
    }
  };

  const filteredCountries = countries.filter((item) =>
    item.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const handleSelectCountry = (country) => {
    setSelectedCountry(country.name);
    if (country.code) {
      setCountryCode(country.code);
      setPhoneNumber('');
    }
    setIsCountryModalVisible(false);
    setSearchCountry('');
  };

  const handleConfirmDate = () => {
    setDob(`${selectedDay}/${selectedMonth}/${selectedYear}`);
    setIsDatePickerVisible(false);
  };

  const handleEditPhoto = () => {
    Alert.alert('Change Profile Picture', 'Choose an option to update your photo.', [
      { text: 'Take Photo', onPress: () => console.log('Take Photo') },
      { text: 'Choose from Gallery', onPress: () => console.log('Choose from Gallery') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleContinue = () => {
    setIsSuccessModalVisible(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalVisible(false);
    navigation?.navigate('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <ArrowLeft color="#000000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fill Your Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Avatar Profile Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: profileImage }} style={styles.avatar} />
            <TouchableOpacity 
              style={styles.editBadge} 
              onPress={handleEditPhoto}
              activeOpacity={0.8}
            >
              <Camera color="#FFFFFF" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 1. Full Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        {/* 2. Nickname Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="Nickname"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        {/* 3. Date of Birth Picker Trigger */}
        <TouchableOpacity 
          style={styles.inputContainer} 
          onPress={() => setIsDatePickerVisible(true)}
          activeOpacity={0.8}
        >
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={dob}
            editable={false}
            placeholder="Date of Birth"
            placeholderTextColor="#A1A1AA"
            pointerEvents="none"
          />
          <View style={styles.iconRight}>
            <Calendar color="#10B981" size={20} />
          </View>
        </TouchableOpacity>

        {/* 4. Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor="#A1A1AA"
          />
          <View style={styles.iconRight}>
            <Mail color="#10B981" size={20} />
          </View>
        </View>

        {/* 5. Country Dropdown Trigger */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsCountryModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.selectText}>{selectedCountry || 'Select Country'}</Text>
          <ChevronDown color="#10B981" size={20} />
        </TouchableOpacity>

        {/* 6. Dynamic Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.countryCodePrefix}>{countryCode} - </Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={getPhoneMaxLength(countryCode)}
            placeholder="Phone Number"
            placeholderTextColor="#A1A1AA"
          />
          <TouchableOpacity onPress={() => setIsCountryModalVisible(true)}>
            <ChevronDown color="#10B981" size={20} />
          </TouchableOpacity>
        </View>

        {/* 7. Gender Dropdown Trigger */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsGenderModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.selectText}>{gender || 'Select Gender'}</Text>
          <ChevronDown color="#10B981" size={20} />
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MODALS ================= */}

      {/* A. Country Selection Modal */}
      <Modal visible={isCountryModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity onPress={() => setIsCountryModalVisible(false)}>
              <X color="#000000" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search color="#A1A1AA" size={18} style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search country..."
              value={searchCountry}
              onChangeText={setSearchCountry}
              placeholderTextColor="#A1A1AA"
            />
          </View>

          {loadingCountries ? (
            <ActivityIndicator size="large" color="#10B981" style={{ marginTop: 40 }} />
          ) : (
            <FlatList
              data={filteredCountries}
              keyExtractor={(item, index) => item.cca2 || index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryOption}
                  onPress={() => handleSelectCountry(item)}
                >
                  <Text style={styles.countryOptionText}>{item.name}</Text>
                  {item.code ? <Text style={styles.countryCodeText}>{item.code}</Text> : null}
                </TouchableOpacity>
              )}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* B. Gender Selection Modal */}
      <Modal visible={isGenderModalVisible} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsGenderModalVisible(false)}
        >
          <View style={styles.dialogCard}>
            <Text style={styles.dialogTitle}>Select Gender</Text>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dialogOption}
                onPress={() => {
                  setGender(option);
                  setIsGenderModalVisible(false);
                }}
              >
                <Text style={[styles.dialogOptionText, gender === option && { color: '#10B981', fontWeight: '700' }]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* C. Quick Date Picker Modal */}
      <Modal visible={isDatePickerVisible} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsDatePickerVisible(false)}
        >
          <View style={styles.dialogCard}>
            <Text style={styles.dialogTitle}>Select Date of Birth</Text>
            
            <View style={styles.datePickerRow}>
              {/* Day */}
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Day</Text>
                <TextInput
                  style={styles.dateInput}
                  value={selectedDay}
                  onChangeText={setSelectedDay}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>

              {/* Month */}
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Month</Text>
                <TextInput
                  style={styles.dateInput}
                  value={selectedMonth}
                  onChangeText={setSelectedMonth}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>

              {/* Year */}
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Year</Text>
                <TextInput
                  style={styles.dateInput}
                  value={selectedYear}
                  onChangeText={setSelectedYear}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.confirmDateButton} onPress={handleConfirmDate}>
              <Text style={styles.confirmDateText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* D. SUCCESS MODAL */}
      <Modal visible={isSuccessModalVisible} animationType="fade" transparent={true}>
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconContainer}>
              <CheckCircle color="#10B981" size={48} strokeWidth={2.5} />
            </View>
            <Text style={styles.successTitle}>Profile Created!</Text>
            <Text style={styles.successMessage}>Your profile details have been saved successfully.</Text>
            
            <TouchableOpacity style={styles.successButton} onPress={handleSuccessClose}>
              <Text style={styles.successButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  backButton: { padding: 4, marginRight: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#000000' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },

  avatarSection: { alignItems: 'center', marginVertical: 16 },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 4,
    backgroundColor: '#FDE047',
  },
  avatar: { width: '100%', height: '100%', borderRadius: 60 },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#10B981',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 16, paddingHorizontal: 18, height: 56, marginBottom: 16 },
  input: { fontSize: 15, fontWeight: '500', color: '#18181B', height: '100%' },
  selectText: { flex: 1, fontSize: 15, fontWeight: '500', color: '#18181B' },
  countryCodePrefix: { fontSize: 15, fontWeight: '700', color: '#10B981' },
  iconRight: { padding: 4 },

  bottomContainer: { paddingHorizontal: 20, paddingBottom: 28, paddingTop: 10, backgroundColor: '#FFFFFF' },
  continueButton: { backgroundColor: '#10B981', borderRadius: 28, height: 56, alignItems: 'center', justifyContent: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  
  modalContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#F4F4F5' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#000000' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4F5', marginHorizontal: 20, marginVertical: 12, borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, fontSize: 14, color: '#000000' },
  countryOption: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#FAFAFA' },
  countryOptionText: { fontSize: 15, color: '#18181B', fontWeight: '500' },
  countryCodeText: { fontSize: 14, color: '#10B981', fontWeight: '600' },
  
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  dialogCard: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, elevation: 5 },
  dialogTitle: { fontSize: 18, fontWeight: '700', color: '#000000', marginBottom: 16 },
  dialogOption: { paddingVertical: 14, borderBottomWidth: 1, borderColor: '#F4F4F5' },
  dialogOptionText: { fontSize: 16, color: '#27272A' },
  
  datePickerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  dateColumn: { flex: 1, marginHorizontal: 4, alignItems: 'center' },
  dateLabel: { fontSize: 12, color: '#71717A', marginBottom: 6 },
  dateInput: { width: '100%', height: 48, backgroundColor: '#F4F4F5', borderRadius: 12, textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#000000' },
  confirmDateButton: { backgroundColor: '#10B981', borderRadius: 12, height: 48, alignItems: 'center', justifyContent: 'center' },
  confirmDateText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },

  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  successButton: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 28,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FillProfile;