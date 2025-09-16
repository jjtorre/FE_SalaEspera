import { MaterialIcons } from "@expo/vector-icons";
import { Button, TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import CustomInput from "../components/customInput";
import React, { useCallback, useState } from "react";
import CustomButton from "../components/customButton";
import { useAuth } from "../context/AuthContext";
import { i18n, useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ navigation }: any) {
  const { logout } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useFocusEffect(
    useCallback(() => {
        setEmail('')
        setPassword('')
      logout(); // limpia sesión al entrar a Login
    }, [])
  );

const {login, isAllowed}=useAuth();
const { register } = useAuth();

    const {language} = useLanguage();
    const {theme} = useTheme();

const handleLogin=async() =>{
const success = await login(email,password);
if(success){
navigation.navigate("HomeScreen", {email, password});
}
}

const handleRegister = async () => {
  const success = await register(email, password);

  if (success) {
    navigation.navigate('HomeScreen', { email,password }); // o donde quieras llevarlo
  }}

    return (
        <View style={[lightStyles.container, theme==='dark' && darkStyles.container]}>
            <View style={[lightStyles.backgroundCard, theme==='dark' && darkStyles.backgroundCard]}>
                <Text style={styles.title}> {i18n.t('signIn')} </Text>

                <CustomInput
                    label="Correo"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required={false}
                />

                <CustomInput
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    required={true}
                />

                <CustomButton
                    title={i18n.t('login')}
                    onPress={handleLogin}
                    variant="primary"
                />

                <CustomButton
                    title="Registrarse"
                    onPress={handleRegister}
                    variant="tertiary"
                />
            </View>
        </View>
    );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  backgroundCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 30,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    color: '#333333',
    marginBottom: 20,
  },
  inputSpacing: {
    marginBottom: 15,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2C',
    padding: 20,
  },
  backgroundCard: {
    backgroundColor: '#2C2C3A',
    borderRadius: 15,
    padding: 30,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  inputSpacing: {
    marginBottom: 15,
  },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E2C', // Fondo oscuro moderno
        padding: 20,
    },
    backgroundCard: {
        backgroundColor: '#FFFFFF', // Fondo blanco para contraste
        borderRadius: 15, // Bordes más redondeados
        padding: 30,
        width: '85%',
        shadowColor: '#000', // Sombra para dar profundidad
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8, // Sombra en Android
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28, // Tamaño más grande
        color: '#333', // Color oscuro para contraste
        marginBottom: 20, // Espaciado inferior
    },
    inputSpacing: {
        marginBottom: 15, // Espaciado entre inputs
    },
});