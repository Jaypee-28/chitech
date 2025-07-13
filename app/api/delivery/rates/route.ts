import { NextResponse } from "next/server";
import { deliveryZones } from "@/utils/deliveryConfig";

type DeliveryType = "standard" | "express" | "pickup";

export async function POST(req: Request) {
  const { state, deliveryType } = await req.json();

  if (!state || !deliveryType) {
    return NextResponse.json(
      { error: "Missing delivery details" },
      { status: 400 }
    );
  }

  const zone = deliveryZones[state as keyof typeof deliveryZones];

  if (!zone) {
    return NextResponse.json(
      { error: "Delivery not available in this state" },
      { status: 404 }
    );
  }

  // Use optional chaining in case 'pickup' is not defined for some states
  const fee = zone.fees?.[deliveryType as DeliveryType];

  if (fee === undefined) {
    return NextResponse.json(
      { error: "Invalid delivery type for this state" },
      { status: 400 }
    );
  }

  return NextResponse.json({ fee });
}
