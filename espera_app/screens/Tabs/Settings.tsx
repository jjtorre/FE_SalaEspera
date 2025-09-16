import { View, Text, Button } from "react-native";
import { useLanguage } from "../../context/LanguageContext";


export default function Settings () {
const {changeLanguage, language} = useLanguage();

    return (
            <View>
               <Text>Bienvenido a Settings</Text> 
               <Text>Tu idioma de traduccion actual: {language}</Text>
               <Button title="EN" onPress={()=> changeLanguage("en")}/>
               <Button title="ES" onPress={()=> changeLanguage("es")}/>
               <Button title="FR" onPress={()=> changeLanguage("fr")}/>
               <Button title="DE" onPress={()=> changeLanguage("de")}/>
            </View>
        )
}