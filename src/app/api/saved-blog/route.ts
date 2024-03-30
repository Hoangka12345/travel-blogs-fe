import { cookies } from "next/headers"

export async function GET(request: Request) {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    const res = await fetch(`${process.env.URL_API}/saved-blog`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${access_token?.value}`,
            "Content-Type": "application/json",
        },
        cache: "no-store"
    })

    const data = await res.json()

    return Response.json(data)
}