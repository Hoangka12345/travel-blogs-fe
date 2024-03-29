import { cookies } from "next/headers"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const res = await fetch(`${process.env.URL_API}/blog?page=${page}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
    })

    const data = await res.json()

    return Response.json(data)
}