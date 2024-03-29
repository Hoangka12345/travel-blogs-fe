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
    updateAccessToken: (token: I_Token) => {},
});

export default function AppProvider({
    children,
    access_token = "",
    refresh_token = "",
}: {
    children: ReactNode;
    access_token?: string;
    refresh_token?: string;
}) {
    const [token, setToken] = useState<I_Token>({ access_token, refresh_token });
    const updateAccessToken = (newToken: I_Token) => setToken(newToken);

    return (
        <AppContext.Provider value={{ token, updateAccessToken }}>
            {children}
        </AppContext.Provider>
    );
}
