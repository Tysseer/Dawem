import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { getFontFamily } from '../js/helpers/scripts';
import { colors } from '../constants';

const Header = ({ lang, title }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={24}
          color={colors.arrow}
        />
      </TouchableOpacity>

      <Text style={[styles.startTitle, getFontFamily(lang)]}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  startTitle: {
    paddingHorizontal: 6,
    color: colors.primary,
    fontSize: 18,
  },
});
