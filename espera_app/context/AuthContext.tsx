import { createContext, useContext, useState } from "react";
import { loginService, registerService } from "../services/authenticationService";

type User = {
    email: string,
    password:string
} | null;

const AuthContext = createContext<{
    user: User,
    isAllowed: boolean,
    login: (email: string,password:string) => Promise<boolean>,
    logout: () => void,
   register:(email: string,password:string) => Promise<boolean>
} | null>(null)

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
    return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [password, setPassword] = useState<User>(null);
    const [isAllowed, setIsAllowed] = useState<boolean>(false);

    const login = async (email: string, password:string) => {
      try {
    const { user, session } = await loginService(email, password);
    setUser(user);
    setIsAllowed(true);
    return true
    // Podés guardar el token si querés:
    // await AsyncStorage.setItem('token', session.access_token);
  } catch (error:any) {
    setUser(null);
    setIsAllowed(false);
    alert(error.message);
    return false
  }

    };

const register = async (email: string, password: string) => {
  try {
    await registerService(email, password); // Paso 1: Registrar

    const { user, session } = await loginService(email, password); // Paso 2: Login automático

    setUser(user);
    setIsAllowed(true);

    // Podés guardar el token:
    // await AsyncStorage.setItem('token', session.access_token);

    return true;
  } catch (error:any) {
    alert(error.message);
    return false;
  }
};

    const logout = () => {
        setUser(null);
        setIsAllowed(false);
    }

    return (
        <AuthContext.Provider value={{user, isAllowed, login, logout,register}}>
            {children}
        </AuthContext.Provider>
    )
}