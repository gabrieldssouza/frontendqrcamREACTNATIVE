import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screans/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screans/LoginScreean";
import SingUpScreen from "../screans/SingUpScreen";
import WelcomeScreen from "../screans/WelcomeScreen";
import InitialScreen from "../screans/InitialScreen";
import BemForms from "../screans/Bemforms";
import IndividualBem from "../screans/individualBem";
import LocalBem from "../screans/LocalBem";
import BemFormEdit from "../componets/BemFormsEdit/BemFormsEdit";
import FormsEditBem from "../screans/FormsEditBem";
import CameraScreen from "../screans/Camera"; 
import LocaisScreen from "../screans/LocaisScreen";
import CategoriaScreen from "../screans/CategoriaScreen";
import Levantamento from "../screans/Levantamento";


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
       <NavigationContainer> 

            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
                <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                <Stack.Screen name="SingUp" options={{ headerShown: false }} component={SingUpScreen} />
                <Stack.Screen name="Initial" options={{ headerShown: false }} component={InitialScreen} />
                <Stack.Screen name="Forms" options={{ headerShown: false }} component={BemForms} />
                <Stack.Screen name="Bem" options={{ headerShown: false }} component={IndividualBem} />
                <Stack.Screen name="LocalBem" options={{ headerShown: false }} component={LocalBem} />
                <Stack.Screen name="BemFormEdit" options={{ headerShown: false }} component={FormsEditBem} />
                <Stack.Screen name="Cam" options={{ headerShown: false }} component={CameraScreen} />
                <Stack.Screen name="Local" options={{ headerShown: false }} component={LocaisScreen} />
                <Stack.Screen name="Categoria" options={{ headerShown: false }} component={CategoriaScreen} />
                <Stack.Screen name="Levantamento" options={{ headerShown: false }} component={Levantamento} />
            </Stack.Navigator>
         </NavigationContainer>    
    );
}
