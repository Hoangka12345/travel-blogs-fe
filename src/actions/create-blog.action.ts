"use server"

import { I_Response } from "@/interfaces/response.interface"
import { cookies } from "next/headers"

export default async function createBlogAction(formData: FormData): Promise<I_Response<any>> {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    try {
        const res = await fetch(`${process.env.URL_API}/blog`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access_token?.value}`
            },
            body: formData
        })
        const data = await res.json()


        if (data.statusCode === 200) {
            return { status: true }
        }
        return { status: false, message: data.message }
    } catch (error) {
        throw error
    }
}