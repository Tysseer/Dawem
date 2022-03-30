import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants';

const MushafScreen = () => {
  useEffect(() => {
    console.log('MushafScreen');
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.screenBg }}>
      <Text>MushafScreen</Text>
    </View>
  );
};

export default MushafScreen;

const styles = StyleSheet.create({});
