import { createContext, useState, useMemo } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
    const [user, setUser] = useState();

    const contextValue = useMemo(() => ({
        user,
        setUser,
    }), [user]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext