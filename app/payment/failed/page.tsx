export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Payment Failed ❌
        </h1>
        <p className="text-gray-700">Your payment was not successful.</p>
        <p className="text-sm text-gray-500 mt-2">
          Please try again or contact support.
        </p>
      </div>
    </div>
  );
}
