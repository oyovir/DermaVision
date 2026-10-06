import React from "react";
import Home from "./Pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionsIntro from "./Pages/Welcome";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Results from "./Pages/Results";
import Camera from "./Pages/CameraIntro";
import Photo from "./Pages/Camera";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, navigationBarColor: "#fff" }}
        />
        <Stack.Screen
          name="QuestionsIntro"
          component={QuestionsIntro}
          options={{ headerShown: false, navigationBarColor: "#fff" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, navigationBarColor: "#fff" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false, navigationBarColor: "#fff" }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{ headerShown: false, navigationBarColor: "#fff" }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ headerShown: false, navigationBarColor: "#fff" }}
        />
        <Stack.Screen
          name="Photo"
          component={Photo}
          options={{ headerShown: false, navigationBarColor: "#fff" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
