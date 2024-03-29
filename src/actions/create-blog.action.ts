"use server"

import { I_Response } from "@/interfaces/response.interface"

export default async function createBlogAction(data: FormData): Promise<I_Response<any>> {
    try {
        const resPromise = await fetch(`${process.env.URL_API}/blog`, {
            method: "POST",
            body: data
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