import { NextResponse } from "next/server";

export async function GET() {
  const timestamp = new Date().toISOString();
  
  return NextResponse.json(
    {
      status: "ok",
      timestamp,
      service: "taylor-morrison-dso",
      version: process.env.npm_package_version || "1.0.0",
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    }
  );
}
