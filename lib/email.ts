import { Resend } from "resend";
import Order from "@/models/Order";
import { formatNaira } from "@/lib/format";

const resend = new Resend(process.env.RESEND_API_KEY!);

// ✅ USER CONFIRMATION EMAIL
export async function sendOrderConfirmation(to: string, orderId: string) {
  try {
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) throw new Error("Order not found");

    const itemRows = order.items
      .map(
        (item: any) => `
          <li>
            ${item.product.title} (x${item.quantity}) — 
            <strong>${formatNaira(item.product.price * item.quantity)}</strong>
          </li>
        `
      )
      .join("");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Thank you for your order, ${order.shipping.fullName}!</h2>
        
        <p><strong>Order ID:</strong> ${order._id}</p>

        <h3>🛒 Items:</h3>
        <ul>${itemRows}</ul>

        <h3>📦 Shipping Info:</h3>
        <p>
          ${order.shipping.address}<br/>
          ${order.shipping.city ? order.shipping.city + "," : ""} ${order.shipping.state}<br/>
          Phone: ${order.shipping.phone}<br/>
          Email: ${order.shipping.email}
        </p>

        <h3>🚚 Delivery:</h3>
        <p>Type: <strong>${order.deliveryType.toUpperCase()}</strong><br/>
        Fee: <strong>${formatNaira(order.deliveryFee)}</strong></p>

        <h3>💳 Payment:</h3>
        <p>Method: <strong>${order.paymentMethod.toUpperCase()}</strong><br/>
        Total: <strong>${formatNaira(order.totalPrice)}</strong></p>

        <p>You can view your full order at any time:</p>
        <p><a href="https://chitech.ng/orders/${order._id}" style="color: #0a7cff;">View Order</a></p>

        <p>We'll notify you again once your order is shipped.</p>

        <p>– The Chitech Team 💙</p>
      </div>
    `;

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to,
      subject: "🧾 Your Chitech Order Confirmation",
      html,
    });

    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send confirmation email");
  }
}

// ✅ ADMIN ORDER NOTIFICATION EMAIL
export async function sendNewOrderNotification({
  adminEmail,
  orderId,
  user,
}: {
  adminEmail: string;
  orderId: string;
  user: { name?: string; email?: string };
}) {
  try {
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) throw new Error("Order not found");

    const itemsList = order.items
      .map(
        (item: any) =>
          `<li>${item.product.title} (x${item.quantity}) — 
          ${formatNaira(item.product.price * item.quantity)}</li>`
      )
      .join("");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>🛒 New Order Received on Chitech</h2>
        
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Customer:</strong> ${user.name || "Unknown"} (${user.email})</p>

        <h3>📦 Items:</h3>
        <ul>${itemsList}</ul>

        <h3>🚚 Shipping Info:</h3>
        <p>
          ${order.shipping.fullName}<br/>
          ${order.shipping.address}<br/>
          ${order.shipping.city}, ${order.shipping.state}<br/>
          Phone: ${order.shipping.phone}
        </p>

        <h3>🧾 Order Summary:</h3>
        <p>
          Delivery Type: <strong>${order.deliveryType.toUpperCase()}</strong><br/>
          Delivery Fee: <strong>${formatNaira(order.deliveryFee)}</strong><br/>
          Total: <strong>${formatNaira(order.totalPrice)}</strong><br/>
          Payment Method: ${order.paymentMethod.toUpperCase()}
        </p>

        <p>
          <a href="https://chitech.ng/admin/orders/${order._id}" 
             style="color: #0a7cff;">
            View Order in Admin Dashboard
          </a>
        </p>

        <p>🚀 Please process this order as soon as possible.</p>
      </div>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: adminEmail,
      subject: `🛒 New Order Alert – ${order.shipping.fullName}`,
      html,
    });
  } catch (error) {
    console.error("❌ Failed to notify admin:", error);
  }
}

// PAYMENT CONFIRMATION TO USER
export async function sendPaymentConfirmation(to: string, orderId: string) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject: "✅ Payment Received - Chitech",
    html: `
      <h1>Thank you!</h1>
      <p>Your payment for Order <strong>${orderId}</strong> has been received.</p>
      <p>You’ll be notified when it ships.</p>
    `,
  });
}

// RESET PASSWORD
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const res = await resend.emails.send({
    from: "Chitech <onboarding@resend.dev>",
    to: email,
    subject: "Reset Your Chitech Password",
    html: `<p>Click the link below to reset your password:</p>
           <a href="${resetUrl}">Reset Password</a>
           <p>This link will expire in 15 minutes.</p>`,
  });

  console.log("🔐 Reset email response:", res);
  return res;
}
