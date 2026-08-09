import { NextResponse } from "next/server";
import crypto from "node:crypto";

export async function POST() {
  const pin = crypto
    .randomInt(0, 10000)
    .toString()
    .padStart(4, "0");

  return NextResponse.json({
    pin
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "POST required" },
    { status: 405 }
  );
}
