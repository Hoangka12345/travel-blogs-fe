import { cookies } from "next/headers"

export async function POST(request: Request) {
    const cookieStore = cookies()

    const data = await request.json()

    if (data.access_token && data.refresh_token) {
        cookieStore.set("access_token", data.access_token, {
            httpOnly: true
        })
        cookieStore.set("refresh_token", data.refresh_token, {
            httpOnly: true
        })

        cookieStore.set("userId", data.user._id, {
            httpOnly: true
        })

        return new Response("login successfully")
    }
    return new Response("login successfully")
}