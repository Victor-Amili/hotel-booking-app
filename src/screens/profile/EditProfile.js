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
  ActivityIndicator
} from 'react-native';
import { ArrowLeft, Calendar, Mail, ChevronDown, Search, X, CheckCircle } from 'lucide-react-native';
import { useTheme } from "../../context/themecontext"; // Added theme context

const EditProfile = ({ navigation }) => {
  const { theme } = useTheme(); // Initialize theme

  // Form Field State
  const [fullName, setFullName] = useState('Ronald Richards');
  const [nickname, setNickname] = useState('Shady');
  const [dob, setDob] = useState('16/03/2004');
  const [email, setEmail] = useState('debbie.baker@example.com');
  const [selectedCountry, setSelectedCountry] = useState('Palestine');
  const [countryCode, setCountryCode] = useState('+970');
  const [phoneNumber, setPhoneNumber] = useState('599138753');
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
      '+1': 10,    // US / Canada
      '+44': 10,   // UK
      '+91': 10,   // India
      '+970': 9,   // Palestine
      '+972': 9,   // Israel
      '+234': 10,  // Nigeria
      '+61': 9,    // Australia
      '+20': 10,   // Egypt
      '+27': 9,    // South Africa
      '+86': 11,   // China
      '+81': 10,   // Japan
      '+49': 11,   // Germany
      '+33': 9,    // France
      '+971': 9,   // UAE
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

  const handleUpdate = () => {
    setIsSuccessModalVisible(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalVisible(false);
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={theme.background === '#FFFFFF' || theme.background === '#FFF' ? "dark-content" : "light-content"} 
        backgroundColor={theme.background} 
      />

      {/* Header Section - Added explicit paddingTop for top spacing */}
      <View style={[styles.header, { paddingTop: 50 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <ArrowLeft color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Edit Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Full Name Input */}
        <View style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }]}>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        {/* 2. Nickname Input */}
        <View style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }]}>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            value={nickname}
            onChangeText={setNickname}
            placeholder="Nickname"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        {/* 3. Date of Birth Picker Trigger */}
        <TouchableOpacity 
          style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }]} 
          onPress={() => setIsDatePickerVisible(true)}
          activeOpacity={0.8}
        >
          <TextInput
            style={[styles.input, { flex: 1, color: theme.text }]}
            value={dob}
            editable={false}
            placeholder="Date of Birth"
            placeholderTextColor={theme.textSecondary}
            pointerEvents="none"
          />
          <View style={styles.iconRight}>
            <Calendar color={theme.primary} size={20} />
          </View>
        </TouchableOpacity>

        {/* 4. Email Input */}
        <View style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }]}>
          <TextInput
            style={[styles.input, { flex: 1, color: theme.text }]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor={theme.textSecondary}
          />
          <View style={styles.iconRight}>
            <Mail color={theme.primary} size={20} />
          </View>
        </View>

        {/* 5. Country Dropdown Trigger */}
        <TouchableOpacity
          style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }]}
          onPress={() => setIsCountryModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.selectText, { color: theme.text }]}>{selectedCountry || 'Select Country'}</Text>
          <ChevronDown color={theme.primary} size={20} />
        </TouchableOpacity>

        {/* 6. Dynamic Phone Number Input */}
        <View style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }]}>
          <Text style={[styles.countryCodePrefix, { color: theme.primary }]}>{countryCode} - </Text>
          
          <TextInput
            style={[styles.input, { flex: 1, color: theme.text }]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={getPhoneMaxLength(countryCode)}
            placeholder="Phone Number"
            placeholderTextColor={theme.textSecondary}
          />
          <TouchableOpacity onPress={() => setIsCountryModalVisible(true)}>
            <ChevronDown color={theme.primary} size={20} />
          </TouchableOpacity>
        </View>

        {/* 7. Gender Dropdown Trigger */}
        <TouchableOpacity
          style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }]}
          onPress={() => setIsGenderModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.selectText, { color: theme.text }]}>{gender}</Text>
          <ChevronDown color={theme.primary} size={20} />
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Update Button */}
      <View style={[styles.bottomContainer, { backgroundColor: theme.background }]}>
        <TouchableOpacity style={[styles.updateButton, { backgroundColor: theme.primary }]} onPress={handleUpdate} activeOpacity={0.8}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MODALS ================= */}

      {/* A. Country Selection Modal */}
      <Modal visible={isCountryModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={[styles.modalHeader, { borderColor: theme.backgroundSecondary }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Select Country</Text>
            <TouchableOpacity onPress={() => setIsCountryModalVisible(false)}>
              <X color={theme.text} size={24} />
            </TouchableOpacity>
          </View>

          <View style={[styles.searchContainer, { backgroundColor: theme.backgroundSecondary }]}>
            <Search color={theme.textSecondary} size={18} style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search country..."
              value={searchCountry}
              onChangeText={setSearchCountry}
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          {loadingCountries ? (
            <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 40 }} />
          ) : (
            <FlatList
              data={filteredCountries}
              keyExtractor={(item, index) => item.cca2 || index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.countryOption, { borderColor: theme.backgroundSecondary }]}
                  onPress={() => handleSelectCountry(item)}
                >
                  <Text style={[styles.countryOptionText, { color: theme.text }]}>{item.name}</Text>
                  {item.code ? <Text style={[styles.countryCodeText, { color: theme.primary }]}>{item.code}</Text> : null}
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
          <View style={[styles.dialogCard, { backgroundColor: theme.card || theme.background }]}>
            <Text style={[styles.dialogTitle, { color: theme.text }]}>Select Gender</Text>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.dialogOption, { borderColor: theme.backgroundSecondary }]}
                onPress={() => {
                  setGender(option);
                  setIsGenderModalVisible(false);
                }}
              >
                <Text style={[
                  styles.dialogOptionText, 
                  { color: theme.text },
                  gender === option && { color: theme.primary, fontWeight: '700' }
                ]}>
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
          <View style={[styles.dialogCard, { backgroundColor: theme.card || theme.background }]}>
            <Text style={[styles.dialogTitle, { color: theme.text }]}>Select Date of Birth</Text>
            
            <View style={styles.datePickerRow}>
              {/* Day */}
              <View style={styles.dateColumn}>
                <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>Day</Text>
                <TextInput
                  style={[styles.dateInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                  value={selectedDay}
                  onChangeText={setSelectedDay}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>

              {/* Month */}
              <View style={styles.dateColumn}>
                <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>Month</Text>
                <TextInput
                  style={[styles.dateInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                  value={selectedMonth}
                  onChangeText={setSelectedMonth}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>

              {/* Year */}
              <View style={styles.dateColumn}>
                <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>Year</Text>
                <TextInput
                  style={[styles.dateInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                  value={selectedYear}
                  onChangeText={setSelectedYear}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>

            <TouchableOpacity style={[styles.confirmDateButton, { backgroundColor: theme.primary }]} onPress={handleConfirmDate}>
              <Text style={styles.confirmDateText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* D. SUCCESS MODAL */}
      <Modal visible={isSuccessModalVisible} animationType="fade" transparent={true}>
        <View style={styles.successOverlay}>
          <View style={[styles.successCard, { backgroundColor: theme.card || theme.background }]}>
            
            {/* Dynamic opacity background matching primary color */}
            <View style={[styles.successIconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <CheckCircle color={theme.primary} size={48} strokeWidth={2.5} />
            </View>
            
            <Text style={[styles.successTitle, { color: theme.text }]}>Successful!</Text>
            <Text style={[styles.successMessage, { color: theme.textSecondary }]}>Your profile has been updated successfully.</Text>
            
            <TouchableOpacity style={[styles.successButton, { backgroundColor: theme.primary }]} onPress={handleSuccessClose}>
              <Text style={styles.successButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 16 
  },
  backButton: { 
    padding: 4, 
    marginRight: 12 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700' 
  },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 20 
  },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 16, 
    paddingHorizontal: 18, 
    height: 56, 
    marginBottom: 16 
  },
  input: { 
    fontSize: 15, 
    fontWeight: '500', 
    height: '100%' 
  },
  selectText: { 
    flex: 1, 
    fontSize: 15, 
    fontWeight: '500' 
  },
  countryCodePrefix: { 
    fontSize: 15, 
    fontWeight: '700' 
  },
  iconRight: { 
    padding: 4 
  },
  bottomContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 28, 
    paddingTop: 10 
  },
  updateButton: { 
    borderRadius: 28, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  updateButtonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: '700' 
  },
  
  modalContainer: { 
    flex: 1 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 16, 
    borderBottomWidth: 1 
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: '700' 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    marginVertical: 12, 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    height: 44 
  },
  searchInput: { 
    flex: 1, 
    fontSize: 14 
  },
  countryOption: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 16, 
    borderBottomWidth: 1 
  },
  countryOptionText: { 
    fontSize: 15, 
    fontWeight: '500' 
  },
  countryCodeText: { 
    fontSize: 14, 
    fontWeight: '600' 
  },
  
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20 
  },
  dialogCard: { 
    width: '100%', 
    borderRadius: 20, 
    padding: 24, 
    elevation: 5 
  },
  dialogTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 16 
  },
  dialogOption: { 
    paddingVertical: 14, 
    borderBottomWidth: 1 
  },
  dialogOptionText: { 
    fontSize: 16 
  },
  
  datePickerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  dateColumn: { 
    flex: 1, 
    marginHorizontal: 4, 
    alignItems: 'center' 
  },
  dateLabel: { 
    fontSize: 12, 
    marginBottom: 6 
  },
  dateInput: { 
    width: '100%', 
    height: 48, 
    borderRadius: 12, 
    textAlign: 'center', 
    fontSize: 16, 
    fontWeight: '700' 
  },
  confirmDateButton: { 
    borderRadius: 12, 
    height: 48, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  confirmDateText: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 16 
  },

  /* --- Success Modal Styles --- */
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successCard: {
    width: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  successButton: {
    width: '100%',
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

export default EditProfile;