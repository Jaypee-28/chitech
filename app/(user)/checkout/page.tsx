// app/checkout/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import CheckoutContent from "@/components/user/checkout/CheckoutContent";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/checkout`);
  }

  return <CheckoutContent />;
}
