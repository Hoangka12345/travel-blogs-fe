import { cookies } from "next/headers"

export async function POST(request: Request) {
    const cookieStore = cookies()

    const { refreshToken } = await request.json()
    const res = await fetch(`${process.env.URL_API}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
    })

    const data = await res.json()
    console.log(data);

    if (data.statusCode === 200) {
        cookieStore.set("access_token", data.access_token)
        cookieStore.set("refresh_token", data.refresh_token)
    }

    return Response.json(data)
}