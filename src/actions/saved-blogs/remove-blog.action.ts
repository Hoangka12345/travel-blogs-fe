"use server"

import { I_Response } from "@/interfaces/response.interface"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function removeBlogAction(savedBlogId: string): Promise<I_Response<any>> {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    try {
        const resPromise = await fetch(`${process.env.URL_API}/saved-blog/${savedBlogId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${access_token?.value}`,
                "Content-Type": "application/json"
            },
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