import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Photo({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [pic, setPic] = useState();

  let cameraRef = useRef();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  const takePicture = async () => {
    if (!cameraRef) return;
    const photo = await cameraRef.current?.takePictureAsync();
    console.log("Initial Photo: ", photo);
    setPic(photo);
    console.log("Stated Photo: ", pic);
    if (pic) {
      navigation.navigate("Camera", {
        pic,
      });
    } else {
      Alert.alert("Please Try Again", "The camera encountered an error.");
    }
  };

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: "#fff",
            }}
            onPress={takePicture}
          ></TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    alignItems: "flex-end",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
