"use server"

import { I_Response } from "@/interfaces/response.interface"
import { cookies } from "next/headers"

export default async function settingAction(formData: FormData): Promise<I_Response<any>> {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    try {
        const res = await fetch(`${process.env.URL_API}/user/setting`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${access_token?.value}`
            },
            body: formData
        })
        const data = await res.json()
        console.log(data);


        if (data.statusCode === 200) {
            return { status: true }
        }
        return { status: false, message: data.message }
    } catch (error) {
        throw error
    }
}