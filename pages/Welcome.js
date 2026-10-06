import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";

const QuestionsIntro = ({ navigation }) => {
  const navi = () => {
    navigation.navigate("Camera", {
      pic,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageHolder}>
        <Image
          source={require("../assets/AfterLogin.png")}
          resizeMode="contain"
          style={{
            width: "90%",
            height: "90%",
          }}
        />
      </View>
      <View style={styles.textArea}>
        <Text style={styles.header}>
          Welcome to <Text style={styles.special}>DermaVision</Text>
        </Text>
        <Text style={styles.para}>
          An Al-powered skin disease detection app. We help you get an instant
          risk indication for skin conditions.
        </Text>
        <View style={styles.feature}>
          <View style={styles.icon}>
            <Image
              source={require("../assets/HowItWorksIcon.png")}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "90%",
              }}
            />
            <Text style={styles.underIcon}>1/3</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.mainTitle}>How It Works</Text>
            <Text style={styles.detailsMain}>
              We ask you to take photos of the area of concern.
            </Text>
          </View>
        </View>
        <View style={styles.feature}>
          <View style={styles.icon}>
            <Image
              source={require("../assets/GetStartedIcon.png")}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "90%",
              }}
            />
            <Text style={styles.underIcon}>2/3</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.mainTitle}>Get Started</Text>
            <Text style={styles.detailsMain}>
              We guide you through the process of taking photos of your skin
              conditions.
            </Text>
          </View>
        </View>
        <View style={styles.feature}>
          <View style={styles.icon}>
            <Image
              source={require("../assets/ResultsIcon.png")}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "90%",
              }}
            />
            <Text style={styles.underIcon}>3/3</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.mainTitle}>Results</Text>
            <Text style={styles.detailsMain}>
              After submitting your photos, we’ll provide you with your risk
              indications.
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={navi}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Start Assesment</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 30,
    flex: 1,
    padding: 0,
    // paddingHorizontal: 30,
    backgroundColor: "#6265CE",
  },
  imageHolder: {
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textArea: {
    height: "60%",
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    width: "100%",
    paddingHorizontal: 19,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#fff",
  },
  para: {
    textAlign: "left",
    fontSize: 19,
    fontWeight: "400",
    lineHeight: 32,
  },
  header: {
    color: "#000",
    marginVertical: -10,
    fontSize: 30,
    fontWeight: "600",
  },
  special: {
    color: "#0073da",
  },
  icon: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  underIcon: {
    fontSize: 10,
    fontWeight: "300",
  },
  feature: {
    width: "100%",
    gap: 5,
    flexDirection: "row",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  detailsMain: {
    fontSize: 17,
    width: "55%",
    lineHeight: 25,
  },
  button: {
    backgroundColor: "#0073da",
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
