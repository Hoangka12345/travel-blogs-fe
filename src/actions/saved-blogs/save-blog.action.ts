"use server"

import { I_Response } from "@/interfaces/response.interface"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function saveBlogAction(blogId: string): Promise<I_Response<any>> {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')
    try {
        const resPromise = await fetch(`${process.env.URL_API}/saved-blog`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access_token?.value}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ blogId })
        })
        const res = await resPromise.json()

        if (res.statusCode === 200) {
            revalidateTag("saved-blog")
            revalidateTag("login-blog")
            return { status: true }
        }
        return { status: false, message: res.message }
    } catch (error) {
        throw error
    }
}