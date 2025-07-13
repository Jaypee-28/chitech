import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { trackingNumber } = await req.json();

    const response = await fetch(
      `https://api.shipbubble.com/v1/track/${trackingNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.SHIPBUBBLE_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error tracking shipment:", error);
    return NextResponse.json(
      { message: "Failed to track shipment" },
      { status: 500 }
    );
  }
}
