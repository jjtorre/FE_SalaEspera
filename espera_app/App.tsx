import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import TabsScreen from './screens/Tabs/TabsScreen';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import RegisterPacienteScreen from './screens/Pacientes/RegisterPaciente';
import PacientesAtendidosHoy from './screens/Pacientes/AtendidosPacientes';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <ThemeProvider>
    <AuthProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="PacientesAtendidosHoy" component={PacientesAtendidosHoy} />
           { <Stack.Screen name="RegisterPaciente" component={RegisterPacienteScreen} />}
            <Stack.Screen name="Tabs" component={TabsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </AuthProvider>
    </ThemeProvider>

  );
}