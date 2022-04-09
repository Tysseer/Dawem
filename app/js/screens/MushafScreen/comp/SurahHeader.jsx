import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const SurahHeader = ({ name }) => {
  return (
    <View key={Math.random().toString()} style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Image
        source={require('assets/images/SurahHeader.png')}
        style={styles.image}
      />
    </View>
  );
};

export default memo(SurahHeader);

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    position: 'relative',
    marginVertical: 10,
    width: '100%',
    height: height * 0.05,
  },
  name: {
    fontFamily: 'Amiri_Bold',
    fontSize: width * 0.04,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
