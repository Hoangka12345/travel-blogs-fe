import { useState } from "react";

export function getHeader() {

    let token: string
    if (typeof window === 'undefined') {
        token = "";
    }
    try {
        const item = window.localStorage.getItem("access_token");
        token = item ? JSON.parse(item) : "";
    } catch (error) {
        console.log(error);
        token = "";
    }

    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token && `Bearer ${token}`
        }
    }
}