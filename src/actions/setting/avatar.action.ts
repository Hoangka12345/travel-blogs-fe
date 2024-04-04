"use server"

import { I_Response } from "@/interfaces/response.interface"
import { cookies } from "next/headers"

export default async function changeAvatarAction(formData: FormData): Promise<I_Response<any>> {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    try {
        const res = await fetch(`${process.env.URL_API}/user/update-avatar`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${access_token?.value}`
            },
            body: formData
        })
        const data = await res.json()

        if (data.statusCode === 200) {
            const { _id, fullName, avatar } = data.data
            const user = { _id, fullName, avatar }
            cookieStore.set('user', JSON.stringify(user), {
                httpOnly: true
            })
            return { status: true, message: data.message }
        }
        return { status: false, message: data.message }
    } catch (error) {
        throw error
    }
}