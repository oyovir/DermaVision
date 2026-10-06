import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";

const SignUp = ({ navigation }) => {
  const [emailAuth, setEmailAuth] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");
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
          <Text style={styles.Header}>Register</Text>
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
              marginBottom: 20,
              marginTop: 30,
            }}
          >
            <Text>Already Have An Account?{` `}</Text>
            <TouchableOpacity>
              <View style={styles.addTaskWrapperSignUp}>
                <Text
                  style={styles.addTaskSignUp}
                  onPress={() => navigation.navigate("Login")}
                >
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => createUser(emailAuth, passwordAuth)}>
            <View style={styles.addTaskWrapper}>
              <Text style={styles.addTask}>Register</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
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
    paddingHorizontal: 100,
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
