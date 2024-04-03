export async function GET(request: Request, { params }: { params: { id: string } }) {
    console.log(params.id);

    const res = await fetch(`${process.env.URL_API}/user/profile/${params.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: 'no-store'
    })

    const data = await res.json()

    console.log(data);


    return Response.json(data)
}