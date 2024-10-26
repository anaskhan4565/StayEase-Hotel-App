import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, TextInput, Platform, Alert } from "react-native";
import { useFonts, Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';


export default function LoginUi({ targetScreen }) {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('jwtToken');
      if (token) {
        console.log("Stored JWT Token:", token);
      } else {
        console.log("No token found.");
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

 //getToken();
  const sendData = async () => {
    const obj = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:3300/UserSignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const result = await response.json();
      if (result.token) {
        await SecureStore.setItemAsync('jwtToken', result.token);
        navigation.navigate("MainScreen");
      } else {
        setSnackbarMessage("Wrong email or password");
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.log("Error sending data", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome Back</Text>
        <Text style={styles.bodyText}>Enter account details below to sign in</Text>
      </View>

      <View style={styles.email}>
        <Text style={styles.emailtext}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
      </View>

      <View style={styles.password}>
        <Text style={styles.passwordtext}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry={true}
        />
      </View>

      <View>
        <Text style={styles.forgotpasswordtext}>Forgot Password?</Text>
      </View>

      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={["#5E35B1", "#8E24AA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Button
            mode="contained"
            onPress={sendData}
            labelStyle={styles.buttonText}
            style={styles.gradientButton}
          >
            Login
          </Button>
        </LinearGradient>
      </View>

      <View style={styles.accountcontainer}>
        <Text style={styles.accounttext}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(targetScreen)}>
          <Text style={styles.signuptext}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  snackbar: {
    backgroundColor: '#d32f2f',
    color: 'white',
  },
  header: {
    marginBottom: 50,
    textAlign: "center",
  },
  headerText: {
    fontSize: 33,
    fontFamily: Platform.OS === "android" ? "sans-serif" : "Nunito_700Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  bodyText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "grey",
  },
  email: {
    marginBottom: 20,
    width: "80%",
  },
  password: {
    marginBottom: 20,
    width: "80%",
  },
  textInput: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    borderWidth: 0.7,
  },
  forgotpasswordtext: {
    color: "black",
    marginLeft: "50%",
    fontWeight: "bold",
    fontFamily: "Nunito_700Bold",
  },
  accountcontainer: {
    flexDirection: "row",
    marginBottom: 50,
    marginTop: 10,
  },
  accounttext: {
    color: "grey",
    fontStyle: "italic",
    fontWeight: "600",
    fontFamily: "Nunito_400Regular",
  },
  signuptext: {
    color: "#7E60BF",
    fontWeight: "bold",
    marginLeft: 5,
    fontFamily: "Nunito_700Bold",
  },
  buttonContainer: {
    width: Platform.OS === "android" ? "85%" : "80%",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonGradient: {
    width: "100%",
    borderRadius: 10,
  },
  gradientButton: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
  emailtext: {
    color: "#666666",
    marginBottom: 5,
    fontFamily: "Nunito_400Regular",
  },
  passwordtext: {
    color: "#666666",
    marginBottom: 5,
    fontFamily: "Nunito_400Regular",
  },
});
