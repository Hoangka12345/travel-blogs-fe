"use client";

import { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AppContext } from "@/providers/app-provider";

export default function AutoChangeToken() {
    const { token, updateAccessToken } = useContext(AppContext);

    useEffect(() => {
        const interval = setInterval(async () => {
            (async () => {
                if (token.access_token) {
                    const decoded = jwtDecode(token.access_token);

                    if (decoded.exp) {
                        const res = await fetch("/api/change-token", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ refreshToken: token.refresh_token }),
                        });

                        const data = await res.json();
                        if (data.statusCode === 200) {
                            updateAccessToken({
                                access_token: data.access_token,
                                refresh_token: data.refresh_token,
                            });
                        }
                    }
                }
            })();
        }, 1000 * 60 * 10);
        return () => clearInterval(interval);
    }, []);

    return null;
}
