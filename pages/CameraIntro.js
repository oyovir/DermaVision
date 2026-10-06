import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

export default function CameraPart({ route, navigation }) {
  let { pic } = route.params;
  const [imageDisease, setImageDisease] = useState(null);
  useEffect(() => {
    if (pic) {
      setImageDisease(pic.uri);
    }
  }, [pic]);

  console.log("Image Disease: ", imageDisease);

  const takePhoto = () => {
    navigation.navigate("Photo");
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageDisease(result.assets[0].uri);
      console.log("Image Disease: ", imageDisease);
    }
  };

  const proceed = () => {
    if (imageDisease != null) {
      navigation.navigate("Results", {
        imageDisease,
      });
    }
    if (imageDisease === null) {
      Alert.alert("Select an image", "Please select an image to proceed", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const clear = () => {
    if (imageDisease) {
      setImageDisease(null);
    }
    if (!imageDisease) {
      Alert.alert("No Image Selected", "Please input an image", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.hero}>
        {/* Text Area */}
        <View style={styles.container2}>
          <Text style={{ fontSize: 35, fontWeight: "800" }}>
            Let The AI Do The Job
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "regular", lineHeight: 32 }}>
            To make sure our AI can detect your skin condition, please take a
            photo of the affected area.
          </Text>
        </View>
        {/* Image */}
        {imageDisease ? (
          <>
            <Image
              source={{ uri: imageDisease }}
              style={{
                width: "30%",
                height: "30%",
                aspectRatio: "1/1",
                marginBottom: 50,
                borderRadius: 50,
              }}
            />
          </>
        ) : (
          <View style={styles.container3}>
            <Image
              source={require("../assets/ScanIntro2.png")}
              style={{ width: "80%", height: "80%", aspectRatio: "1/1" }}
            />
          </View>
        )}
        {/* List */}
        <View style={styles.container4}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={require("../assets/SelectPhoto.png")}
              style={{ width: 125, height: 125 }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={takePhoto}>
            <Image
              source={require("../assets/TakePhoto.png")}
              style={{ width: 125, height: 125 }}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={clear}>
            <Image
              source={require("../assets/RetryPhoto.png")}
              style={{ width: 125, height: 125 }}
            />
          </TouchableOpacity>
        </View>
        {/* Submit */}
        <TouchableOpacity style={{}} onPress={proceed}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  bold: {
    fontWeight: "800",
  },
  hero: {
    gap: 15,
    backgroundColor: "fff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    height: "10%",
    width: "100%",
  },
  container2: {
    gap: 5,
  },
  container3: {
    height: "45%",
  },
  container4: {
    width: "50%",
    alignItems: "center",
    marginTop: -50,
    justifyContent: "center",
    flexDirection: "row",
  },
  container5: {
    width: "100%",
    height: "20%",
  },
  statusBarContainer: {
    backgroundColor: "#ECECEC",
    width: "100%",
    height: "25%",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 20,
  },
  statusBarFiller: {
    backgroundColor: "#000",
    width: "50%",
    height: "100%",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#0073da",
    paddingHorizontal: 90,
    paddingVertical: 15,
    borderRadius: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
