"use client";

import { ReactNode, createContext, useState } from "react";

interface I_User {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

const initialUser: I_User = {
    _id: "",
    firstName: "",
    lastName: "",
    avatar: "",
};

export const UserContext = createContext({
    user: initialUser,
    updateUser: (user: I_User) => {},
});

export default function UserProvider({
    children,
    userInfo = initialUser,
}: {
    children: ReactNode;
    userInfo?: I_User;
}) {
    const [user, setUser] = useState<I_User>(userInfo);
    const updateUser = (newUser: I_User) => setUser(newUser);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
