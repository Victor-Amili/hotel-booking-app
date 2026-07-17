import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "@hotel_booking_auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const authData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (authData) {
        const parsed = JSON.parse(authData);
        setUser(parsed.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error loading auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData, token) => {
    try {
      const authData = { user: userData, token };
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Error saving auth state:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error clearing auth state:", error);
    }
  };

  const updateUser = async (updates) => {
    const updatedUser = { ...user, ...updates };
    try {
      const authData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (authData) {
        const parsed = JSON.parse(authData);
        parsed.user = updatedUser;
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(parsed));
      }
      setUser(updatedUser);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;