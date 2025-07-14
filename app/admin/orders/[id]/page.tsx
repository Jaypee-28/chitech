import { type NextPage } from "next";
import Order from "@/models/Order";
import AdminOrderDetail from "@/components/admin/order/AdminOrderDetail";
import { connectToDB } from "@/lib/mongoose";

// Define the props interface explicitly
interface OrderPageProps {
  params: { id: string };
}

// Use NextPage type for better compatibility with Next.js
const AdminOrderPage: NextPage<OrderPageProps> = async ({ params }) => {
  try {
    // Ensure database connection
    await connectToDB();

    // Fetch order with populated fields
    const order = await Order.findById(params.id)
      .populate("user")
      .populate("items.product")
      .lean(); // Use .lean() for better performance by converting to plain JS object

    // Handle case where order is not found
    if (!order) {
      return (
        <div className="p-6">
          <h1 className="text-xl font-semibold text-red-600">
            Order not found.
          </h1>
        </div>
      );
    }

    // Pass order to AdminOrderDetail (no need for JSON.parse/stringify with .lean())
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <AdminOrderDetail order={order} />
      </div>
    );
  } catch (error) {
    // Handle database or other errors
    console.error("Error fetching order:", error);
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">
          Failed to load order. Please try again later.
        </h1>
      </div>
    );
  }
};

export default AdminOrderPage;
