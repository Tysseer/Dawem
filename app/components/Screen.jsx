import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants';

const Screen = ({ children }) => {
  return (
    <View style={{ padding: 20, backgroundColor: colors.screenBg, flex: 1 }}>
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({});
