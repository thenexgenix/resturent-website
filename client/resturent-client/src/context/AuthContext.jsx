import { createContext, useState } from "react";


// Create a context for authentication
// This context will be used to provide authentication state and functions to the rest of the app
const AuthContext = createContext();

// Create a provider component
// This component will wrap the app and provide authentication state and functions to its children
export const AuthProvider = ({ children }) => {

const [token, setTokenState] = useState(null);

    
    return(
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}