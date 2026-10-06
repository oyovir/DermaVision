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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";
import * as MailComposer from "expo-mail-composer";
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
        AsyncStorage.setItem("email", user.email);
        AsyncStorage.setItem("password", passwordAuth);
        console.log(user.email);
        console.log(
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
        console.log(
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
      <View style={styles.imageHolder}>
        <Image
          source={require("../assets/loginNew.png")}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "90%",
          }}
        />
      </View>
      <View style={styles.textArea}>
        <Image
          source={require("../assets/logo.png")}
          // resizeMode="contain"
          style={{
            width: "70%",
            height: 70,
            alignSelf: "center",
          }}
        />
        <View style={styles.inputHolder}>
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
          <View style={styles.Buttons}>
            <TouchableOpacity
              onPress={() => SignInUserEmailPassword(emailAuth, passwordAuth)}
            >
              <View style={styles.addTaskWrapper1}>
                <Text style={styles.addTask1}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => createUser(emailAuth, passwordAuth)}
            >
              <View style={styles.addTaskWrapper}>
                <Text style={styles.addTask}>Register</Text>
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
          <Text style={styles.para}>
            By continuing, you agree to the Terms of Use. Read our Privacy
            Policy for more details
          </Text>
        </View>
      </View>
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
    // paddingHorizontal: 30,
    backgroundColor: "#FFD55A",
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
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    backgroundColor: "#fff",
  },
  para: { textAlign: "center", marginVertical: 15 },
  input: {
    paddingVertical: 15,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1.25,
    fontSize: 18,
    borderRadius: 10,
    borderColor: "#7092B4",
    padding: 15,
  },
  inputHolder: {
    gap: 10,
    paddingHorizontal: 30,
    width: "100%",
  },
  addTask: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 20,
  },
  addTask1: {
    fontWeight: "700",
    color: "#000",
    fontSize: 20,
  },
  addTaskWrapper: {
    width: 180,
    // paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: "#0773da",
    borderRadius: 20,
    borderWidth: 3,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#0773da",
    alignItems: "center",
    marginVertical: 20,
  },
  addTaskWrapper1: {
    width: 180,
    // paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: "#eee",
    borderRadius: 20,
    borderWidth: 3,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#eee",
    alignItems: "center",
    marginVertical: 20,
  },
  addTaskWrapper: {
    width: 180,
    // paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: "#0773da",
    borderRadius: 20,
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
    alignSelf: "center",
    fontSize: 15,
  },
  Buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
