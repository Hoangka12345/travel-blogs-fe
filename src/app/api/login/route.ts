export async function POST(request: Request) {
    const res = await request.json()
    const access_token = res?.access_token
    const refresh_token = res?.refresh_token
    if (access_token && refresh_token) {
        return new Response(null, {
            status: 200,
            headers: {
                'Set-Cookie': [
                    `access_token=${access_token}; Path=/; HttpOnly; `,
                    `refresh_token=${refresh_token}; Path=/; HttpOnly; `
                ].join(', ')
            },
        })
    } else {
        return new Response(null, {
            status: 500,
        })
    }

}