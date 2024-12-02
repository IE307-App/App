import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import InputField from "../components/InputField";
import ListCard from "../components/searchScreen/ListCard";
import EmojisList from "../components/searchScreen/EmojisList";
import userService from "../src/services/user.service";
import { GlobalStyles } from "../constants/Styles";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { useNavigation } from '@react-navigation/native';

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const navi = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  function handleClick(user) {
    console.log("User clicked-----------------", user);
    navi.navigate("OtherProfileScreen", { user });
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Search Friends",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      style={styles.container}
    >
      <StatusBar backgroundColor={GlobalStyles.colors.primary} />
      <View style={{ margin: 10 }}>
        <InputField
          onChangeText={(text) => setSearch(text)}
          onBlur={() => setInputFocused(false)}
          onFocus={() => setInputFocused(true)}
          value={search}
          placeholder="Search"
          keyboardType="default"
          inValid={true}
          search={true}
        />
      </View>
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListCard onPress={() => handleClick(item)} userData={item} />
          )}
          ListEmptyComponent={<Text style={styles.noResultsText}>No users found</Text>}
        />
      ) : (
        <>
          {!inputFocused && (
            <>
              <Animated.View entering={FadeInLeft} exiting={FadeOutRight} style={{ marginVertical: 50 }}>
                <EmojisList />
              </Animated.View>
            </>
          )}
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
  noResultsText: {
    color: GlobalStyles.colors.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default SearchScreen;
