import { cookies } from "next/headers"

export async function POST(request: Request) {
    const cookieStore = cookies()

    const { access_token, refresh_token, user } = await request.json()

    if (access_token && refresh_token) {
        cookieStore.set("access_token", access_token, {
            httpOnly: true
        })
        cookieStore.set("refresh_token", refresh_token, {
            httpOnly: true
        })

        cookieStore.set("user", JSON.stringify(user), {
            httpOnly: true
        })

        return new Response("login successfully")
    }
}