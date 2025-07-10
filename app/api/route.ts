import { NextResponse, NextRequest } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  let hostel = request.nextUrl.searchParams.get("hostel");
  let mess = request.nextUrl.searchParams.get("mess");

  let resp = await fetch(
    `https://messit-server-vinnovateit.vercel.app/?hostel=${hostel}&mess=${mess}`,
  );
  let data = await resp.json();

  return NextResponse.json(data, { status: 200 });
}
