import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { USER_DATA } from "../data/USER";

export const AuthContext = createContext({
  updateUserData: () => {},
  userData: {},
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContentProvider({ children }) {
  //lấy userData lúc nhập
  const [userData, setUserData] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("token"); 
      if (token) {
        setIsAuthenticated(true); // Nếu có token, xác thực người dùng
      }
    };
    checkAuthStatus();
  }, []);

  // Hàm xác thực: Lưu token vào AsyncStorage và cập nhật context
  const authenticate = async (userData) => {
    setIsAuthenticated(true);
    setUserData(userData); 

    await AsyncStorage.setItem("token", userData.jwt); 
    await AsyncStorage.setItem("userData", JSON.stringify(userData)); 
  };
  function logout() {
    setUserData(null);
    AsyncStorage.removeItem("userData");
    console.log("logout");
  }
  function updateUserData(newData) {
    setUserData((prevData) => {
      return { ...prevData, user: newData };
    });
  }
  const value = {
    userData: userData,
    isAuthenticated: isAuthenticated,
    authenticate: authenticate,
    logout: logout,
    updateUserData: updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;
