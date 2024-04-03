"use server"

import { I_Response } from "@/interfaces/response.interface"

export default async function getBlogBySearch(search: string, page: number = 1,): Promise<I_Response<any>> {
    try {
        const res = await fetch(`${process.env.URL_API}/blog?page=${page}&search=${search}`, {
            method: "GET",
            headers: {
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