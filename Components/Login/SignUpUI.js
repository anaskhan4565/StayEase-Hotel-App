import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, TextInput, Platform } from "react-native";
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Button, Snackbar } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function SignUpUI({ targetscreen }) {
    const navigation = useNavigation();
    const [data, setdata] = useState();
    const [password, setpassword] = useState();
    const [email, setemail] = useState();
    const [repassword, setrepassword] = useState();
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackcolor, setsnackcolor] = useState(false);
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
        Poppins_400Regular,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    const senddetails = async () => {
        if (password != repassword) {
            setSnackbarMessage("Passwords dont match");
            setSnackbarVisible(true);
            return;
        }
        const obj = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:3300/UserSignup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                const result = await response.json();
                if (result === 'Email already in use') {
                    setSnackbarMessage("Email already in use");
                    setSnackbarVisible(true);
                }
                else {
                    setSnackbarMessage("Account Successfully created");
                    setSnackbarVisible(true);
                    setsnackcolor(true);
                    setTimeout(() => {
                        navigation.navigate(targetscreen);
                    }, 2000);
                }
            }

        } catch (error) {
            setSnackbarMessage("An error has occured");
            setSnackbarVisible(true);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backbutton}>
                <AntDesign name="back" size={30} />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome</Text>
                <Text style={styles.bodyText}>Enter account details below to sign Up</Text>
            </View>

            <View style={styles.email}>
                <Text style={styles.emailtext}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setemail}
                    style={styles.textInput}
                />
            </View>

            <View style={styles.password}>
                <Text style={styles.passwordtext}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setpassword}
                    style={styles.textInput}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.password}>
                <Text style={styles.passwordtext}>Reenter Password</Text>
                <TextInput
                    value={repassword}
                    onChangeText={setrepassword}
                    style={styles.textInput}
                    secureTextEntry={true}
                />
            </View>
            <View>
                { }
            </View>


            <View>
                <Text style={styles.forgotpasswordtext}>Forgot Password?</Text>
            </View>

            <View style={styles.buttonContainer}>
                <LinearGradient
                    colors={['#5E35B1', '#8E24AA']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                >
                    <Button
                        mode="contained"
                        onPress={senddetails}
                        labelStyle={styles.buttonText}
                        style={styles.gradientButton}
                    >
                        Signup
                    </Button>
                </LinearGradient>
            </View>

            <View style={styles.accountcontainer}>
                <Text style={styles.accounttext}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate(targetscreen)} >
                    <Text style={styles.signuptext}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={{
                    backgroundColor: snackcolor ? 'green' : '#d32f2f',
                    color: 'white',
                }}
            >
                {snackbarMessage}
            </Snackbar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: '100%',
    },
    snackbar: {
        backgroundColor: '#d32f2f',
        color: 'white',
    },
    header: {
        marginBottom: 50,
        textAlign: 'center',
    },
    backbutton: {
        position: 'absolute',
        top: 30,
        left: 20,
    },
    headerText: {
        fontSize: 33,
        fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Nunito_700Bold',  // Explicit font family for header
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bodyText: {
        fontFamily: 'Nunito_400Regular',  // Explicit font family for body text
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'grey',
    },
    email: {
        marginBottom: 20,
        width: '80%',
    },
    password: {
        marginBottom: 20,
        width: '80%',
    },
    textInput: {
        width: '100%',
        height: 48,
        borderRadius: 10,
        borderWidth: 0.7,
    },
    forgotpasswordtext: {
        color: 'black',
        marginLeft: '50%',
        fontWeight: 'bold',
        fontFamily: 'Nunito_700Bold',  // Apply bold font family here
    },
    accountcontainer: {
        flexDirection: 'row',
        marginBottom: 50,
        marginTop: 10,
    },
    accounttext: {
        color: 'grey',
        fontStyle: 'italic',
        fontWeight: '600',
        fontFamily: 'Nunito_400Regular',  // Regular font family for "Already have an account?"
    },
    signuptext: {
        color: '#7E60BF',
        fontWeight: 'bold',
        marginLeft: 5,
        fontFamily: 'Nunito_700Bold',  // Bold font for "Sign Up"
    },
    buttonContainer: {
        width: Platform.OS === 'android' ? '85%' : '80%',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 }, // Increase the height for more drop shadow
                shadowOpacity: 0.5,  // Increase opacity for a darker shadow
                shadowRadius: 15,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    buttonGradient: {
        width: '100%',
        borderRadius: 10,
    },
    gradientButton: {
        width: '100%',
        height: 48,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',  // Apply font family to the button text
    },
    emailtext: {
        color: '#666666',
        marginBottom: 5,
        fontFamily: 'Nunito_400Regular',  // Regular font for email label
    },
    passwordtext: {
        color: '#666666',
        marginBottom: 5,
        fontFamily: 'Nunito_400Regular',  // Regular font for password label
    },
});
