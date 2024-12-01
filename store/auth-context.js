import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { serverLink } from "../constants/server";

export const AuthContext = createContext({
  updateUserData: () => {},
  userData: {},
  isAuthenticated: false,
  authenticate: (userData) => {},
  logout: () => {},
});

const ApiUrl = serverLink;

function AuthContentProvider({ children }) {
  const [userData, setUserData] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); 
        if (token) {
          setIsAuthenticated(true); 
          const responseUserData = await axios.get(ApiUrl + "/api/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          await AsyncStorage.setItem("userData", JSON.stringify(responseUserData.data)); 
          setUserData(responseUserData.data); 
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái xác thực:", error);
      }
    };
    checkAuthStatus();
  }, []);

  // Hàm xác thực: Lưu token vào AsyncStorage và cập nhật context
  const authenticate = async (userData) => {
    try {
      setIsAuthenticated(true);
      setUserData(userData); 
      await AsyncStorage.setItem("userData", JSON.stringify(userData)); 
    } catch (error) {
      console.error("Lỗi khi xác thực:", error);
    }
  };

  const logout = async () => {
    try {
      setUserData(null);
      setIsAuthenticated(false);
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("token");
      console.log("Đã đăng xuất");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const updateUserData = (newData) => {
    setUserData((prevData) => {
      return { ...prevData, ...newData }; // Kết hợp dữ liệu mới với dữ liệu người dùng hiện tại
    });
  };

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
