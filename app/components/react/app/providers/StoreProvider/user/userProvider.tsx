import React, {
    createContext, useContext, useEffect, useState, ReactNode, useMemo,
} from 'react';
import CookieService from '@/shared/lib/utils/CookieService';

// Define the context
const UserContext = createContext<{
    userLogged: UserLogged | null;
    setUserLogged: React.Dispatch<React.SetStateAction<UserLogged | null>>;
} | null>(null);

// Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userLogged, setUserLogged] = useState<UserLogged | null>(null);

    useEffect(() => {
        const userLoggedJson = CookieService.getCookieValueJson<UserLogged>('user_data');
        if (userLoggedJson) {
            setUserLogged(userLoggedJson);
        }
    }, []);

    // Memoize the context value
    const contextValue = useMemo(
        () => ({
            userLogged,
            setUserLogged,
        }),
        [userLogged],
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easy access
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
