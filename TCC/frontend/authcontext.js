import React, {Children, createContext} from "react";
import { useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const {teste, setTeste} = useState('teste value');


    return(
        <AuthContext.Provider value={{teste, setTeste}}> 
            {children}
        </AuthContext.Provider>
    );
}