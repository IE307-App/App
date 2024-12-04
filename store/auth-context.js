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
  addNotification: () => {},
  notifications: [],
  addComment: false,
});

const ApiUrl = serverLink;

function AuthContentProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]); // Danh sách thông báo
  const [addComment, setAddComment] = useState(false);

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
  const handleAddComment = () => {
    setAddComment(!addComment);
  }

  const logout = async () => {
    try {
      setUserData(null);
      setIsAuthenticated(false);
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  // Hàm cập nhật thông tin người dùng
  const updateUserData = (newData) => {
    setUserData((prevData) => {
      return { ...prevData, ...newData };
    });
  };

  // Hàm thêm thông báo vào danh sách
  const addNotification = (message) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: new Date().getTime(), message }, // Tạo id duy nhất bằng timestamp
    ]);
  };

  // Hàm theo dõi người dùng
  const handleFollowUser = (followerName) => {
    // Thêm thông báo khi có người theo dõi
    addNotification(`${followerName} đã theo dõi bạn!`);
  };

  const value = {
    userData: userData,
    isAuthenticated: isAuthenticated,
    authenticate: authenticate,
    logout: logout,
    updateUserData: updateUserData,
    notifications: notifications, // Truyền danh sách thông báo
    addNotification: addNotification, // Hàm để thêm thông báo
    handleFollowUser: handleFollowUser, // Hàm theo dõi người dùng
    handleAddComment: handleAddComment,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;
