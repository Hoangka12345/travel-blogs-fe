"use server"

import { I_Response } from "@/interfaces/response.interface"
import { cookies } from "next/headers"

export default async function removeReactionAction(blogId: string): Promise<I_Response<any>> {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    try {
        const resPromise = await fetch(`${process.env.URL_API}/blog/remove-reaction/${blogId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${access_token?.value}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ blogId })
        })
        const res = await resPromise.json()

        if (res.statusCode === 200) {
            return { status: true }
        }
        return { status: false, message: res.message }
    } catch (error) {
        throw error
    }
}