import { cookies } from "next/headers"

export async function OPTIONS() {
    const cookieStore = cookies()
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
    return new Response("Logout successfully!", {
        status: 200
    })
}