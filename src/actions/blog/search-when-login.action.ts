"use server"

import { I_Response } from "@/interfaces/response.interface"
import { cookies } from "next/headers"

export default async function getBlogBySearchWhenLogin(search: string, page: number = 1,): Promise<I_Response<any>> {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    try {
        const res = await fetch(`${process.env.URL_API}/blog/user?page=${page}&search=${search}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token?.value}`,
                "Content-Type": "application/json"
            },
        })
        const data = await res.json()


        if (data.statusCode === 200) {
            return {
                status: true,
                data: data.data
            }
        }
        return { status: false }
    } catch (error) {
        throw error
    }
}