import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DayBadge from '../../assets/images/dayBadge.png';
import DayBadgeDim from '../../assets/images/dayBadge_dim.png';
import WeekBadge from '../../assets/images/weekBadge.png';
import WeekBadgeDim from '../../assets/images/weekBadge_dim.png';
import MonthBadge from '../../assets/images/monthBadge.png';
import MonthBadgeDim from '../../assets/images/monthBadge_dim.png';

const RenderBadgeImg = ({ badgeName, dim }) => {
  const renderContent = () => {
    if (badgeName == 'dayBadge') {
      if (dim) {
        return <Image source={DayBadgeDim} style={styles.badge} />;
      } else {
        return <Image source={DayBadge} style={styles.badge} />;
      }
    } else if (badgeName == 'weekBadge') {
      if (dim) {
        return <Image source={WeekBadgeDim} style={styles.badge} />;
      } else {
        return <Image source={WeekBadge} style={styles.badge} />;
      }
    } else if (badgeName == 'monthBadge') {
      if (dim) {
        return <Image source={MonthBadgeDim} style={styles.badge} />;
      } else {
        return <Image source={MonthBadge} style={styles.badge} />;
      }
    }
  };
  return renderContent();
};

export default RenderBadgeImg;

const styles = StyleSheet.create({
  badge: {
    width: 60,
    height: 56,
    resizeMode: 'cover',
    marginRight: 15,
  },
});
