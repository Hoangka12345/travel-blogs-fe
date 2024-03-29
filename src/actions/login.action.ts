"use server"

import { I_Response } from "@/interfaces/response.interface"

export default async function loginAction(data: any): Promise<I_Response<any>> {
    try {
        const resPromise = await fetch(`${process.env.URL_API}/auth/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const res = await resPromise.json()
        if (res.statusCode === 200) {
            return {
                status: true,
                data: {
                    access_token: res.access_token,
                    refresh_token: res.refresh_token,
                }
            }
        } else {
            return {
                status: false,
            }
        }
    } catch (error) {
        throw error
    }
}