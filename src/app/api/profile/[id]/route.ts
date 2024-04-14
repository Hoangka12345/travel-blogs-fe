export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const res = await fetch(`${process.env.URL_API}/user/profile/${params.id}?page=${page}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: 'no-store'
    })

    const data = await res.json()

    return Response.json(data)
}