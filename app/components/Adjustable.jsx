import { useState } from 'react';
import { Text } from 'react-native';

const AdjustLabel = ({ fontSize, text, style, numberOfLines }) => {
  const [currentFont, setCurrentFont] = useState(fontSize);

  return (
    <Text
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={true}
      style={[style, { fontSize: currentFont, backgroundColor: '#ff0' }]}
      onTextLayout={(e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > numberOfLines) {
          setCurrentFont(currentFont - 1);
        }
      }}
    >
      {text}
    </Text>
  );
};

export default AdjustLabel;
