import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import MessageCard from "../components/messagesScreen/MessageCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../constants/Styles";
import { Use } from "react-native-svg";
import userService from "../src/services/user.service";

const MessagesScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [paddingTop, setPaddingTop] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAll();
        const user = await userService.getUserProfile();

        // xóa user hiện tại ra khỏi danh sách response
        const index = response.findIndex((item) => item.id === user.id);
        response.splice(index, 1);
 
        setUsers(response); // Cập nhật state với dữ liệu người dùng
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          top: 0,
          width: "100%",
        }}
      >
        <View
          onLayout={(e) => {
            setPaddingTop(e.nativeEvent.layout.height + 15);
          }}
          style={{ margin: 20, marginTop: StatusBar.currentHeight + 15 }}
        >
          <InputField
            onChangeText={setSearch}
            onBlur={() => {}}
            value={search}
            placeholder="Search"
            keyboardType="default"
            inValid={true}
            search={true}
          />
        </View>
      </View>

      <FlatList
         data={users} // Truyền danh sách người dùng vào FlatList
         keyExtractor={(item, index) => item.id.toString()} // Giả sử mỗi người dùng có id duy nhất
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{
           paddingTop: paddingTop,
           paddingBottom: GlobalStyles.styles.tabBarPadding,
         }}
         renderItem={({ item, index }) => {

           return <MessageCard item={item} />; // Truyền mỗi người dùng vào MessageCard
         }}
       />
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
});
