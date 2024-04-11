"use client";

import { ReactNode, createContext, useState } from "react";

interface I_Token {
    access_token: string;
    refresh_token: string;
}

export const AppContext = createContext({
    token: {
        access_token: "",
        refresh_token: "",
    },
    user: "",
    updateAccessToken: (token: I_Token) => {},
    updateUserId: (_id: string) => {},
});

export default function AppProvider({
    children,
    access_token = "",
    refresh_token = "",
    userId = "",
}: {
    children: ReactNode;
    access_token?: string;
    refresh_token?: string;
    userId?: string;
}) {
    const [token, setToken] = useState<I_Token>({ access_token, refresh_token });
    const [user, setUser] = useState<string>(userId);
    const updateAccessToken = (newToken: I_Token) => setToken(newToken);
    const updateUserId = (_id: string) => setUser(_id);

    return (
        <AppContext.Provider value={{ token, user, updateAccessToken, updateUserId }}>
            {children}
        </AppContext.Provider>
    );
}
