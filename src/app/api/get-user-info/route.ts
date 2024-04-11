import { cookies } from "next/headers"

export async function GET(request: Request) {
    const cookieStore = cookies()
    const userId = cookieStore.get('userId')

    const res = await fetch(`${process.env.URL_API}/user/${userId?.value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
    })

    const data = await res.json()


    return Response.json(data)
}