import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Results = ({ route, navigation }) => {
  let { imageDisease } = route.params;
  const [imagePic, setImagePic] = useState(imageDisease);
  const [imageURL, setImageURL] = useState();
  const [riyal, setRiyal] = useState(false);
  const [Data, setData] = useState();
  const [pic, setPic] = useState(null);

  const uploadToFirebase = async (uri, name, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
          console.log(downloadUrl);
          setImageURL(`${downloadUrl}`);
        }
      );
    });
  };

  const detection = () => {
    // Your PAT (Personal Access Token) can be found in the Account's Security section
    const PAT = "4e8f5a6d3d5742f7b66b4e9a640d9678";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "silent";
    const APP_ID = "DermaVisionV2";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "xfer-learn-skindisease";
    const MODEL_VERSION_ID = "e14b656e8e28465b81c2425e6ebdd2b2";
    const IMAGE_URL = `${imageURL}`;

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
    if (MODEL_ID && MODEL_VERSION_ID && PAT) {
      fetch(
        "https://api.clarifai.com/v2/models/" +
          MODEL_ID +
          "/versions/" +
          MODEL_VERSION_ID +
          "/outputs",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log("API Response:", result);

          if (result && result.outputs && result.outputs.length > 0) {
            const firstOutput = result.outputs[0];
            const data = firstOutput.data;

            if (data) {
              console.log("Data:", data);
              setData(data);
\
                for (const region of regions) {
                  const concepts = region.data && region.data.concepts;

                  if (concepts) {
                    for (const concept of concepts) {
                      const name = concept.name;
                      const value = concept.value && concept.value.toFixed(4);
                      // console.log(`${name}: ${value}`);
                    }
                  }
                }
              } else {
                console.log("No regions found in the response");
              }
            } else {
              console.log("No data found in the response");
            }
          } else {
            console.log("Invalid response format");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.log("Missing required parameters for the fetch request");
    }
  };
  useEffect(() => {
    const smth = async () => {
      const imageName2 = imageDisease.substring(
        imageDisease.lastIndexOf("/") + 1
      );

      setImagePic(imageName2);

      // console.log("1: ", imageDisease);
      // console.log("2: ", imagePic);
      const uri = imageDisease;
      const uploadResp = await uploadToFirebase(uri, imageName2, (v) => {
        // conso

    smth();
  }, []);

  return (
    <View style={styles.main1}>
      <ImageBackground
        style={styles.main}
        source={
          imageURL
            ? require("../assets/QuestionsFinal.png")
            : require("../assets/DermaVisio_Loading.gif")
        }
      >
        {imageURL ? (
          !riyal ? (
            <>
              <Image
                source={{ uri: imageDisease }}
                style={{ width: 200, height: 200, borderRadius: 60 }}
              />
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={detection}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Get Your Results</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                // alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
                gap: 50,
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "500", lineHeight: 45 }}>
                Based on your answers and scan, we think it’s{" "}
                <Text
                  style={{ fontSize: 30, fontWeight: "bold", lineHeight: 45 }}
                >{`${Data.concepts[0].name}.`}</Text>
              </Text>
              {/* <Image
                source={require("../assets/End.png")}
                style={{
                  width: "30%",
                  alignSelf: "center",
                  height: "30%",
                  aspectRatio: 1 / 1,
                  borderRadius: 10,
                }}
              /> */}
              <Image
                source={{ uri: imageDisease }}
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: 80,
                  marginVertical: -30,
                  alignSelf: "center",
                }}
              />
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", lineHeight: 35 }}
                >
                  Your Risk Level Is
                </Text>
                <Text
                  style={{
                    fontSize: 50,
                    fontWeight: "800",
                    lineHeight: 35,
                    padding: 20,
                    marginTop: 30,
                    alignSelf: "center",
                    color: "#000",
                  }}
                >{`${Math.round(Data.concepts[0].value * 100)}%`}</Text>
                {Math.round(Data.concepts[0].value * 100) > 50 ? (
                  <>
                    <Text style={{ fontSize: 18, lineHeight: 25 }}>
                      We recommend you to visit a dermatologist based on your
                      skin conditions.
                    </Text>
                    <TouchableOpacity
                      style={styles.buttonWrapper}
                      onPress={() => navigation.navigate("Camera", { pic })}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>
                          Recheck Your Results
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={{ fontSize: 18, lineHeight: 25 }}>
                      We recommend you to visit a dermatologist though we find
                      your conditions mild.
                    </Text>
                    <TouchableOpacity
                      style={styles.buttonWrapper}
                      onPress={() => navigation.navigate("Camera", { pic })}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>
                          Recheck Your Results
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  main1: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  report: {
    width: "80%",
    backgroundColor: "#313841",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  risk: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headRisk: {
    fontSize: 18,
    color: "#fff",
  },
  buttonWrapper: {
    backgroundColor: "#0773da",
    borderRadius: 11,
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  nig1: {
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 35,
    padding: 20,
    alignSelf: "center",
    color: "#000",
  },
  nig2: {
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 35,
    padding: 20,
    alignSelf: "center",
    color: "#FF8A00",
  },
  nig3: {
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 35,
    padding: 20,
    alignSelf: "center",
    color: "#FF0000",
  },
});
