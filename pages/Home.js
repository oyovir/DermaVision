import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={require("../assets/logo.png")}
          // resizeMode="contain"
          style={{
            width: "80%",
            height: 70,
            marginTop: 20,
            alignSelf: "center",
          }}
        />
        <Image
          source={require("../assets/Hero.png")}
          resizeMode="contain"
          style={{
            width: "110%",
            height: 250,
            alignSelf: "center",
          }}
        />
        {/* <Text style={styles.Header}>Understand Your Skin Conditions</Text> */}
        <Text style={styles.para}>
          Your personal skin health assistant. Get started to take a picture or
          upload a photo of your skin condition.
        </Text>
        <View
          style={{
            width: "100%",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => navigation.navigate("Login")}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.buttonWrapper1}
            onPress={() => navigation.navigate("Login")}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText1}>Learn More</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <StatusBar style="dark" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  bold: {
    fontWeight: "800",
  },
  hero: {
    backgroundColor: "fff",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 35,
    padding: 20,
  },
  Header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
    marginBottom: 5,
  },
  para: {
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 32,
  },
  buttonWrapper: {
    // marginTop: 10,
    backgroundColor: "#0773da",
    borderRadius: 15,
    width: "100%",
  },
  buttonWrapper1: {
    // marginTop: 10,
    backgroundColor: "#F0F2F5",
    borderRadius: 15,
    width: "100%",
  },
  button: {
    // paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonText1: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },
  Sec2: {},
});
