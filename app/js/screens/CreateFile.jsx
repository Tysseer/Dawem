import React, { Component, useEffect } from "react";
import { Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const CreateFile = () => {
  const Create = async () => {
    console.log("lllll");
    let fileUri = FileSystem.documentDirectory + "test.txt";
    await FileSystem.writeAsStringAsync(fileUri, "Dawem World", {
      encoding: FileSystem.EncodingType.UTF8,
    });
    // const asset = await MediaLibrary.createAssetAsync(fileUri);
    const asset = await FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "test.txt",
      {
        encoding: FileSystem.EncodingType.UTF8,
      }
    );
    console.log("asset", asset);
  };

  useEffect(() => {
    console.log("llllllllllkk");
    Create();
  }, []);

  return (
    <View>
      <Text> ffffffff </Text>
    </View>
  );
};
export default CreateFile;
