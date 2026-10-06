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
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";
import * as MailComposer from "expo-mail-composer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ navigation }) => {
  const [emailAuth, setEmailAuth] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        setEmailAuth(await AsyncStorage.getItem("email"));
        setPasswordAuth(await AsyncStorage.getItem("password"));
      } catch (e) {
        console.log(e);
      }
    }
    fetch();
  }, []);

  const createUser = (email, password) => {
    Keyboard.dismiss();

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        const user = firebaseAuth.currentUser;
        console.log(user.email);
        Alert.alert(
          "Account Created!",
          "Your Account Was Successfully Created! 😎"
        );
        navigation.navigate("QuestionsIntro");
      })
      .catch((error) => {
        Alert.alert("Error!", error.message);
      });

    setEmailAuth("");
    setPasswordAuth("");
  };

  const SignInUserEmailPassword = (email, password) => {
    Keyboard.dismiss();

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        const user = firebaseAuth.currentUser;
        AsyncStorage.setItem("email", user.email);
        AsyncStorage.setItem("password", passwordAuth);
        Alert.alert(
          "Account Signed In!",
          "Your Account Was Successfully Signed In! 😄"
        );
        navigation.navigate("QuestionsIntro");
      })
      .catch((err) => {
        Alert.alert("Error!", err.message);
      });

    setEmailAuth("");
    setPasswordAuth("");
  };

  const options = {
    recipients: ["dermavision.lvisn@gmail.com"], // Include multiple recipients as needed
    subject: "Please reset my password",
    body: "Please reset my password",
    isHtml: false, // Set to true if the body is in HTML format
  };

  const openMailComposer = async () => {
    try {
      const result = await MailComposer.composeAsync(options);
      if (result.status === "sent") {
        console.log("Email sent successfully!");
      } else {
        console.log("Email was not sent.");
      }
    } catch (error) {
      console.error("Error composing email:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/QuestionsFinal.png")}
        style={{ flex: 1, width: "100%" }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "android" ? "padding" : "height"}
          style={styles.keyboard}
        >
          {/* <Image
            source={require("../assets/LowResLoad.gif")}
            // source={require("../assets/DermaVisio_Loading.gif")}
            style={{
              width: 120,
              height: 120,
            }}
          /> */}
          {/* <Image
            source={require("../assets/Login.png")}
            resizeMode="contain"
            style={{ width: 400, height: 250 }}
          /> */}
          <Text style={styles.Header}>Login</Text>
          <TextInput
            placeholder="Email..."
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmailAuth(text);
            }}
            value={emailAuth}
          />
          <TextInput
            placeholder="Password..."
            value={passwordAuth}
            style={styles.input}
            onChangeText={(newText) => setPasswordAuth(newText)}
            secureTextEntry
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            <Text>New to DermaVision?{` `}</Text>
            <TouchableOpacity>
              <View style={styles.addTaskWrapperSignUp}>
                <Text
                  style={styles.addTaskSignUp}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <View style={styles.addTaskWrapperSignUp}>
              <Text
                style={styles.addTaskSignUp}
                onPress={() => openMailComposer()}
              >
                Forgot Password
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SignInUserEmailPassword(emailAuth, passwordAuth)}
          >
            <View style={styles.addTaskWrapper}>
              <Text style={styles.addTask}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => createUser(emailAuth, passwordAuth)}>
            <View style={styles.addTaskWrapper}>
              <Text style={styles.addTask}>Reg</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 30,
    flex: 1,
    padding: 0,
    // paddingHorizontal: 30,
    backgroundColor: "#fbfbfb",
  },
  bold: {
    fontWeight: "800",
  },
  Header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 15,
  },
  keyboard: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    flex: 1,
    paddingHorizontal: 30,
    // backgroundColor: "#fbfbfb",
  },
  input: {
    paddingVertical: 15,
    width: 300,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: "#999",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  addTask: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  addTaskWrapper: {
    width: 300,
    paddingVertical: 9,
    paddingHorizontal: 120,
    backgroundColor: "#0773da",
    borderRadius: 100,
    borderWidth: 3,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#0773da",
    alignItems: "center",
    marginVertical: 20,
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  addTaskWrapperSignUp: {},
  addTaskSignUp: {
    color: "#0773da",
    textDecorationLine: "underline",
  },
  small: {
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
  },
});
