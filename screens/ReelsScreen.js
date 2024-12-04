import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Linking } from "react-native";
import { GlobalStyles } from "../constants/Styles";

// Cập nhật dữ liệu thông báo
const dummyPosts = [
  {
    id: "1",
    title: "Thông báo kết quả tuyển chọn chính thức lớp Huredee VI",
    date: "04/12/2024 - 13:49",
    location: "Mới",
    link: "https://student.uit.edu.vn/thong-bao-ket-qua-tuyen-chon-chinh-thuc-lop-huredee-vi",
  },
  {
    id: "2",
    title: "Thông báo lịch thi cuối kỳ học kỳ 1 năm học 2024-2025",
    date: "14/11/2024 - 15:38",
    location: "Mới",
    link: "https://student.uit.edu.vn/thong-bao-lich-thi-cuoi-ky-hoc-ky-1-nam-hoc-2024-2025",
  },
  {
    id: "3",
    title: "Thông báo Quyết định công nhận Tốt nghiệp đợt 4 năm 2024",
    date: "13/11/2024 - 14:55",
    location: "Mới",
    link: "https://student.uit.edu.vn/thong-bao-quyet-dinh-cong-nhan-tot-nghiep-dot-4-nam-2024",
  },
  {
    id: "4",
    title: "[UIT-TALENTBRIDGE] Tham gia khảo sát CTĐT nhân lực ưu tú hướng doanh nghiệp",
    date: "12/11/2024 - 09:26",
    location: "Mới",
    link: "https://student.uit.edu.vn/uit-talentbridge-tham-gia-khao-sat-ctdt-nhan-luc-uu-tu-huong-doanh-nghiep",
  },
  {
    id: "5",
    title: "Thông báo Danh sách sinh viên dự kiến TN đợt 4 năm 2024",
    date: "07/11/2024 - 08:35",
    location: "Mới",
    link: "https://student.uit.edu.vn/thong-bao-danh-sach-sinh-vien-du-kien-tn-dot-4-nam-2024",
  },
  {
    id: "6",
    title: "Thông báo lịch thi tập trung Giữa kỳ Đợt 2 học kỳ 1 năm học 2024-2025",
    date: "29/10/2024 - 15:18",
    location: "",
    link: "https://student.uit.edu.vn/thong-bao-lich-thi-tap-trung-giua-ky-dot-2-hoc-ky-1-nam-hoc-2024-2025-danh-cho-khoa-tuyen-sinh-nam",
  },
  {
    id: "7",
    title: "Tuyển sinh Khóa học tiếng Nhật (miễn phí) Khóa VI và giới thiệu việc làm tại Nhật Bản - tài trợ bởi Huredee",
    date: "11/10/2024 - 08:17",
    location: "",
    link: "https://student.uit.edu.vn/tuyen-sinh-khoa-hoc-tieng-nhat-mien-phi-khoa-vi-va-gioi-thieu-viec-lam-tai-nhat-ban-tai-tro-boi",
  }
];

const ITEM_SIZE = GlobalStyles.styles.windowHeight - GlobalStyles.styles.tabBarPadding + 25;

const ReelsScreen = () => {
  const [posts, setPosts] = useState([]);
  const ScrollY = useRef(new Animated.Value(0)).current; // Khởi tạo ScrollY

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(dummyPosts); // Set the dummy posts
    };
    fetchPosts();
  }, []);

  // Sự kiện khi nhấn vào thông báo
  const handleNotificationPress = (link) => {
    Linking.openURL(link); // Mở đường dẫn
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", width: "80%" }}>
          <View style={{ marginHorizontal: 20, justifyContent: "space-between" }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
                {item.title}
              </Text>
            </View>

            <Text style={{ fontSize: 12, color: "gray" }}>{item.date}</Text>
          </View>
        </View>

        {/* Hiển thị "Mới" nếu có thông báo mới */}
        {item.location && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>Mới</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => handleNotificationPress(item.link)}
          style={{ width: "20%", height: 80 }}
        >
          <Text style={{ color: "white", fontSize: 16, textAlign: "center", marginTop:30 }}>Xem</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        // Thêm tính năng cuộn mượt
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: ScrollY } } }],
          { useNativeDriver: false }
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newBadge: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    position: "absolute",
    top: 10,
    right: 10,
  },
  newBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ReelsScreen;
