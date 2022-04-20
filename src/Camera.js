import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";

const Camera = () => {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  let defaultImg = "https://i.postimg.cc/yxY28q4R/Ellipse-1.png";




  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    
    let pickerResult = await ImagePicker.launchCameraAsync();
     setImage({ localUri: pickerResult.uri })
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

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    setTimeout(()=>{
      askForCameraPermission();
    },1000)
    // setImage('');
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400,}}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      <Text style={styles.logoQr}> Qr Code </Text>

      <Image
        source={{
          uri: `${image === null ? defaultImg : image.localUri}`,
          // uri: `${image.localUri}`,
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
        <TouchableOpacity
          style={{
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          
      {scanned && (
        <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" onPress={() => setScanned(false)} />    
      )}

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
    width: 200,
    height: 200,
    borderRadius: 150,
    elevation: 12,
  },
  maintext: {
    position:'relative',
    top:400,
    fontSize: 16,
    margin: 20,
    color:'black'
  },
  logoQr:{
    color:'white',
    backgroundColor:'#303030',
    padding:12,
    borderRadius:6,
    fontWeight:'bold',
    fontSize:14,
    position:'absolute',
    top:120
  },
  barcodebox: {
    position: "absolute",
    top: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
});
