"use client";

import { ReactNode, createContext, useState } from "react";

interface I_User {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export const UserContext = createContext({
    user: {
        _id: "",
        firstName: "",
        lastName: "",
        avatar: "",
    },
    updateUser: (user: I_User) => {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<I_User>({
        _id: "",
        firstName: "",
        lastName: "",
        avatar: "",
    });
    const updateUser = (newUser: I_User) => setUser(newUser);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
