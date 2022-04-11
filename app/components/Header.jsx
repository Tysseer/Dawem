import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFontBasicStyle } from "../js/helpers/scripts";
import { colors } from "../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, empty, showIcon = true }) => {
  const reducer = useSelector((state) => state);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!empty && (
        <>
          {showIcon && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name={`arrow-${I18nManager.isRTL ? "right" : "left"}`}
                size={24}
                color={colors.arrow}
              />
            </TouchableOpacity>
          )}

          {title && (
            <Text
              style={[styles.startTitle, getFontBasicStyle(reducer.strLang, true)]}
            >
              {title}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: "#EEE",
  },
  startTitle: {
    paddingHorizontal: 6,
    color: colors.primary,
    fontSize: 18,
    alignSelf:'center'
  },
});
