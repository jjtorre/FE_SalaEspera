import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import React, { useState } from "react";
import {
    View, Text, TextInput, KeyboardTypeOptions,
    StyleSheet,
    TouchableOpacity
} from "react-native";

type Props = {
    label: string;
    value: string;
    type?: 'text' | 'password' | 'email' | 'number';
    onChange: (text: string) => void;
    required?: boolean;
}

export default function CustomInput({ label, value, type = "text", onChange, required }: Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSecureText, setIsSecureText] = useState(type === 'password');
    const [isFocused, setIsFocused] = useState(false); // Nuevo estado para el enfoque

    const isPasswordField = type === 'password';
    
    const keyboardType: KeyboardTypeOptions =
/*Flujos de control: operador ternario: */
        type === 'email' ? 'email-address' :
        type === 'number' ? 'numeric'
        : 'default';

    const icon =
        type === 'email' ? 'email' :
        type === 'password' ? 'lock' : 'text-fields';    
        
    const getError = () => {
        if (required && !value) return 'Este campo es obligatorio';
/* evaluar si correo tiene @*/
        if (type === 'email' && !value.includes('@')) return 'Correo invalido';
/*evaluar minimo de caracteres para contrasena*/
        if (type === 'password' && value.length < 6) return 'Contraseña debe ser mas fuerte';
        return null;
    };
    const error = getError();

    return (
        <View style={styles.wrapper}>
            <View style={[
                styles.inputContainer, 
                error && styles.inputError, 
                isFocused && styles.focusedInput // Aplicar estilo al enfocar
            ]}>
                <MaterialIcons name={icon as any} size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={label}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isSecureText}
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocused(true)} // Manejar enfoque
                    onBlur={() => setIsFocused(false)} // Manejar desenfoque
                />
                {isPasswordField && (
                    <TouchableOpacity 
                        onPress={() => {
                            setIsPasswordVisible(!isPasswordVisible);
                            setIsSecureText(!isSecureText);
                        }}>
                        <Ionicons 
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={20} />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { 
        marginBottom: 15 
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8, // Bordes más redondeados
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9', // Fondo claro
    },
    inputError: {
        borderColor: 'red',
    },
    input: {
        flex: 1,
        paddingVertical: 12, // Más espacio vertical
        fontSize: 16, // Tamaño de texto más grande
        color: '#333', // Color de texto más oscuro
    },
    icon: {
        marginRight: 10, // Más espacio entre el ícono y el texto
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5, // Separación del mensaje de error
    },
    focusedInput: {
        borderColor: '#007BFF', // Color azul al enfocar
    },
});
