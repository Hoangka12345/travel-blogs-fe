import { cookies } from "next/headers"

export async function GET(request: Request, { params }: { params: { blogId: string } }) {

    const res = await fetch(`${process.env.URL_API}/reaction/count/${params.blogId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-store"
    })

    const data = await res.json()

    return Response.json(data)
}