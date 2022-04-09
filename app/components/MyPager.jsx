import { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';

const MyPager = ({ children, initialPage, handlePageChange }) => {
  const onPageSelected = ({ position }) => {
    handlePageChange(position);
  };

  // const onPageScroll = (e) => {
  //   console.log(e);
  // };

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={initialPage}
      onPageSelected={(eventDate) => onPageSelected(eventDate.nativeEvent)}
      pageMargin={10}

      // showPageIndicator={true}
      // transitionStyle="curl"
    >
      {children}
    </PagerView>
  );
};

export default memo(MyPager);

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
