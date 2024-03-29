import { cookies } from "next/headers"

export async function GET() {
    const cookieStore = cookies()
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
    cookieStore.delete("user")
    return new Response("Logout successfully!", {
        status: 200
    })
}