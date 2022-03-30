import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TestComp() {
  const [size, setSize] = useState(20);
  const [viewHeight, setViewHeight] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    if (textHeight > viewHeight) {
      setSize(size - 1); // <<< You may adjust value 1 to a smaller value so the text can be shrink more precisely
    }
  }, [textHeight]);

  return (
    <View style={styles.container}>
      <View
        style={{
          margin: 20,
          backgroundColor: 'pink',
          width: 200,
          height: 200,
        }}
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          setViewHeight(height);
        }}
      >
        <Text
          style={{
            fontSize: size,
          }}
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            setTextHeight(height);
          }}
        >
          Gemma is a middle grade novel that follows a curious explorer and her
          ring-tailed lemur, Milo, as they hunt for the “most greatest treasure
          in the world”. Solving riddles, battling a bell-wearing jaguar, and
          traveling the Eight Seas, Gemma’s adventures take her from a young
          girl to a brave captain, whose only limits are the stars.
        </Text>
      </View>

      <View
        style={{
          margin: 20,
          backgroundColor: 'yellow',
          width: 200,
          height: 200,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Gemma is a middle grade novel that follows a curious explorer and her
          ring-tailed lemur, Milo, as they hunt for the “most greatest treasure
          in the world”. Solving riddles, battling a bell-wearing jaguar, and
          traveling the Eight Seas, Gemma’s adventures take her from a young
          girl to a brave captain, whose only limits are the stars.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
