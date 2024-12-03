import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

export const GlobalStyles = {
  colors: {
    primary: "#262938",
    primary100: "rgb(8, 8, 8)",
    primary200: "#2B2C3E",
    primary300: "#2E2F40",
    primary500: "#363747",
    primary600: "#3f4152",
    gray: "rgba(225, 225, 225,0.5)",
    gray100: "rgba(225, 225, 225,0.05)",
    gray200: "#888888",
    blue: "#7A40F8",
    blue100: "#6BB0f5",
    cyan: "#4cc9f0",
    purple: "#C3B1E1",
    purpleDark: "#C459F4",
    magenta: "#F49AC2",
    orange: "#fdac1d",
    greenLight: "#00ECCA",
    green: "#7fff62",
    red: "#ef3e55",
    pink: "#f72585",
    persianRed: "#C44536",
    darkGreen: "#297e2b",
    tabBarColor: "#07070F",
    yellow: "#E0FF55",
    white: "#FFFFFF",
    blueDark: "#0000FF",
    lightBlue: "#ADD8E6",
    black: "#000000",
    blue3: "#436EEE",
  },
  styles: StyleSheet.create({
    tabBarPadding: 100,
    windowWidth: width,
    windowHeight: height,
  }),
};
export const DEFAULT_DP =
  "https://i.pinimg.com/474x/36/c0/12/36c0123e0d97b72d303a82113b3390e5.jpg";
