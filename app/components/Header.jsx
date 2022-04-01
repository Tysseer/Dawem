import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { getFontFamily } from '../js/helpers/scripts';
import { colors } from '../constants';

const Header = ({ lang, title, empty, showIcon = true }) => {
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
                name={`arrow-${I18nManager.isRTL ? 'right' : 'left'}`}
                size={24}
                color={colors.arrow}
              />
            </TouchableOpacity>
          )}

          {title && (
            <Text style={[styles.startTitle, getFontFamily(lang,true)]}>
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#EEE',
  },
  startTitle: {
    paddingHorizontal: 6,
    color: colors.primary,
    fontSize: 18,
  },
});
