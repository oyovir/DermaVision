import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseAuth } from "../firebaseConfig";

const DETECTION_URL = "https://us-central1-dermavision-aad34.cloudfunctions.net/detectSkinDisease";

const Results = ({ route, navigation }) => {
  const { imageDisease } = route.params;
  const [imageURL, setImageURL] = useState();
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState();
  const [pic, setPic] = useState(null);

  const uploadToFirebase = async (uri, name) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = ref(getStorage(), `images/${name}`);
    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        reject,
        async () => resolve(await getDownloadURL(uploadTask.snapshot.ref))
      );
    });
  };

  const detection = async () => {
    try {
      if (!imageURL) return;
      const user = firebaseAuth.currentUser;
      if (!user) {
        Alert.alert("Login required", "Please sign in before scanning.");
        return;
      }

      const idToken = await user.getIdToken();
      const response = await fetch(DETECTION_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ imageUrl: imageURL }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Inference failed");

      const resultData = result?.outputs?.[0]?.data;
      if (!resultData?.concepts?.length) throw new Error("No prediction was returned.");

      setData(resultData);
      setShowResults(true);
    } catch (error) {
      console.error("Detection error:", error);
      Alert.alert("Scan failed", "We couldn't analyze the image. Please try again.");
    }
  };

  useEffect(() => {
    const upload = async () => {
      try {
        const imageName = imageDisease.substring(imageDisease.lastIndexOf("/") + 1);
        setPic(imageName);
        setImageURL(await uploadToFirebase(imageDisease, imageName));
      } catch (error) {
        console.error("Upload error:", error);
        Alert.alert("Upload failed", "We couldn't upload the image.");
      }
    };
    upload();
  }, [imageDisease]);

  const topConcept = data?.concepts?.[0];
  const riskPercent = topConcept ? Math.round(topConcept.value * 100) : 0;

  return (
    <View style={styles.main1}>
      <ImageBackground
        style={styles.main}
        source={imageURL ? require("../assets/QuestionsFinal.png") : require("../assets/DermaVisio_Loading.gif")}
      >
        {imageURL && !showResults ? (
          <>
            <Image source={{ uri: imageDisease }} style={{ width: 200, height: 200, borderRadius: 60 }} />
            <TouchableOpacity style={styles.buttonWrapper} onPress={detection}>
              <View><Text style={styles.buttonText}>Get Your Results</Text></View>
            </TouchableOpacity>
          </>
        ) : showResults && topConcept ? (
          <View style={styles.results}>
            <Text style={styles.heading}>
              Based on your answers and scan, we think it’s <Text style={styles.bold}>{topConcept.name}.</Text>
            </Text>
            <Image source={{ uri: imageDisease }} style={styles.resultImage} />
            <View>
              <Text style={styles.subheading}>Your Risk Level Is</Text>
              <Text style={styles.percentage}>{riskPercent}%</Text>
              <Text style={styles.description}>
                {riskPercent > 50
                  ? "We recommend that you consult a dermatologist based on the scan result."
                  : "The scan result appears mild, but consider consulting a dermatologist if you have concerns."}
              </Text>
              <TouchableOpacity style={styles.buttonWrapper} onPress={() => navigation.navigate("Camera", { pic })}>
                <View><Text style={styles.buttonText}>Recheck Your Results</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  main1: { flex: 1 },
  main: { flex: 1, alignItems: "center", justifyContent: "center" },
  results: { width: "100%", height: "100%", justifyContent: "center", paddingHorizontal: 20, gap: 35 },
  heading: { fontSize: 30, fontWeight: "500", lineHeight: 45 },
  bold: { fontWeight: "bold" },
  resultImage: { width: 300, height: 300, borderRadius: 80, alignSelf: "center" },
  subheading: { fontSize: 20, fontWeight: "500", lineHeight: 35 },
  percentage: { fontSize: 50, fontWeight: "800", lineHeight: 55, padding: 20, alignSelf: "center" },
  description: { fontSize: 18, lineHeight: 25 },
  buttonWrapper: { backgroundColor: "#0773da", borderRadius: 11, marginTop: 20, paddingHorizontal: 30, paddingVertical: 10, justifyContent: "center", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 22 }
});
