import { type NextRequest, NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const hostel = request.nextUrl.searchParams.get("hostel");
	const mess = request.nextUrl.searchParams.get("mess");

	const resp = await fetch(
		`https://messit-server-vinnovateit.vercel.app/?hostel=${hostel}&mess=${mess}`,
	);
	const data = await resp.json();

	return NextResponse.json(data, { status: 200 });
}
