export async function GET(request: Request) {
    const res = await fetch(`${process.env.URL_API}/user/top-users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
    })

    const data = await res.json()

    return Response.json(data)
}