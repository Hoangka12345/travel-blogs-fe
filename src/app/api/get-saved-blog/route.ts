import { cookies } from "next/headers"

export async function GET(request: Request) {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')

    const res = await fetch(`${process.env.URL_API}/saved-blog?page=${page}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${access_token?.value}`,
            "Content-Type": "application/json",
        },
        next: { tags: ['saved-blog'] }
    })

    const data = await res.json()

    return Response.json(data)
}