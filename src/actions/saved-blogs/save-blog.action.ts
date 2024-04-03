"use server"

import { I_Response } from "@/interfaces/response.interface"
import { cookies } from "next/headers"

export default async function saveBlogAction(blogId: string): Promise<I_Response<any>> {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')
    console.log(blogId);


    try {
        const resPromise = await fetch(`${process.env.URL_API}/user/add-saved-blog`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${access_token?.value}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ blogId })
        })
        const res = await resPromise.json()
        console.log(res);


        if (res.statusCode === 200) {
            return { status: true }
        }
        return { status: false, message: res.message }
    } catch (error) {
        throw error
    }
}