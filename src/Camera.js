import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Entypo } from "@expo/vector-icons";

const Camera = () => {
  const [image, setImage] = useState(null);
  let defaultImg = "https://i.postimg.cc/yxY28q4R/Ellipse-1.png";

  //   console.log(image.localUri);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    setImage({ localUri: pickerResult.uri });
    const asset = await MediaLibrary.createAssetAsync(pickerResult.uri);
  };

  let openImageCameraPickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(image.localUri);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${image === null ? defaultImg : image.localUri}`,
        }}
        style={styles.img}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "white",
          width: "80%",
          borderRadius: 5,
          height: 40,
          marginTop: 20,
          elevation: 12,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={openImagePickerAsync}
        >
          <Entypo name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={openImageCameraPickerAsync}
        >
          <Entypo name="images" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={openShareDialogAsync}
        >
          <Entypo name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcfcfc",
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 20,
    elevation: 12,
  },
});
