import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { colors } from '../constants';
import { getFontFamily } from '../js/helpers/scripts';
import Center from './Center';

const ActionBtn = ({
  text,
  icon = false,
  handler,
  lang,
  contained = false,
  disabled = false,
  fullWidth = false,
  style,
  ...rest
}) => {
  const extraStyle = {
    //borderStyle: contained ? 'solid' : 'none',
    borderWidth: contained ? 1 : 0,
    backgroundColor: disabled
      ? colors.primary_disabled
      : contained
      ? colors.light_bg
      : colors.primary,
    width: fullWidth ? '100%' : '48%',
    
  };

  const extraTextStyle = {
    color: contained ? '#B0B0B0' : '#fff',
    alignSelf: fullWidth ? 'center' : 'flex-start',
    // flexDirection: 'row',
    // alignSelf: fullWidth ? 'center' : 'flex-start',
    // textAlign: fullWidth ? 'center' : 'left',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handler}
      style={{ ...styles.btn, ...extraStyle, ...style }}
      {...rest}
    >
      <Center style={{ flexDirection: 'row' }}>
        {icon && <Feather name="plus" size={24} color="#fff" />}

        <Text
          style={{
            ...styles.text,
            ...getFontFamily(lang),
            ...extraTextStyle,
          }}
        >
          {text}
        </Text>
      </Center>
    </TouchableOpacity>
  );
};

export default ActionBtn;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 7,
    // width: '100%',
  },
});
