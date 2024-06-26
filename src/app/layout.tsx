import LayoutProvider from "@/components/layout/layout.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import AppProvider from "../providers/app-provider";
import AutoChangeToken from "@/components/auto-change-token.component";
import UserProvider from "@/providers/user-provider";
import BlogProvider from "@/providers/blogs-provider";
import { I_User } from "@/interfaces/user.interface";
import WebSocketProvider from "@/providers/socket.provider";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let userInfo;
    const cookieStore = cookies();
    const access_token = cookieStore.get("access_token")?.value;
    const refresh_token = cookieStore.get("refresh_token")?.value;
    const userId = cookieStore.get("userId")?.value;

    return (
        <html lang="en">
            <body>
                <AppProvider
                    access_token={access_token}
                    refresh_token={refresh_token}
                    userId={userId}
                >
                    <WebSocketProvider>
                        <UserProvider userInfo={userInfo}>
                            <BlogProvider>
                                <LayoutProvider>
                                    {children}
                                    <AutoChangeToken />
                                </LayoutProvider>
                            </BlogProvider>
                        </UserProvider>
                    </WebSocketProvider>
                </AppProvider>
                <ToastContainer />
            </body>
        </html>
    );
}
