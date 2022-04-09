import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

const mockDataList = [
  { id: '1', text: 'Swipe me left!' },
  { id: '2', text: 'Swipe me right!' },
  { id: '3', text: 'Try swiping in both directions' },
];

const Separator = () => <View style={styles.itemSeparator} />;

const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0],
  });
  return (
    <>
      <TouchableOpacity onPress={() => alert('Delete button pressed')}>
        <View
          style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}
        >
          <Animated.Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: '600',
              transform: [{ scale }],
            }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Archive button pressed')}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            justifyContent: 'center',
          }}
        >
          <Animated.Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: '600',
              transform: [{ scale }],
            }}
          >
            Archive
          </Animated.Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View
      style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center' }}
    >
      <Animated.Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          transform: [{ scale }],
        }}
      >
        Left Action
      </Animated.Text>
    </View>
  );
};

// const LeftActions = () => {
//   return (
//     <View
//       style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center' }}
//     >
//       <Text
//         style={{
//           color: 'white',
//           paddingHorizontal: 10,
//           fontWeight: '600',
//         }}
//       >
//         Left Action
//       </Text>
//     </View>
//   );
// };

const ListItem = ({ text }) => (
  <GestureHandlerRootView>
    <Swipeable
      renderLeftActions={LeftActions}
      renderRightActions={RightActions}
    >
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>{text}</Text>
      </View>
    </Swipeable>
  </GestureHandlerRootView>
);

const Sandbox = () => {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={mockDataList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItem {...item} />}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
});

export default Sandbox;
