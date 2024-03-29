export async function GET(request: Request, { params }: { params: { id: string } }) {
    const res = await fetch(`${process.env.URL_API}/user/${params.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: 'no-store'
    })

    const data = await res.json()

    return Response.json(data)
}