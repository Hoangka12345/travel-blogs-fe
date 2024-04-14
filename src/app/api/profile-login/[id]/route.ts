import { cookies } from "next/headers"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const res = await fetch(`${process.env.URL_API}/user/profile-login/${params.id}?page=${page}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${access_token?.value}`,
            "Content-Type": "application/json"
        },
        cache: 'no-store'
    })

    const data = await res.json()

    return Response.json(data)
}