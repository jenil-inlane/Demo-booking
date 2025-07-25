"use client";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId") ?? "";

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful
      </h2>
      <p className="mb-2">
        Transaction ID: <span className="font-mono">{transactionId}</span>
      </p>
      <p className="mb-4 text-green-500">
        Your payment has been processed successfully.
      </p>
      <p>Thank you for choosing Lane!</p>
      <div className="mt-6">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScaim22xJxjijs-nV0nVjZ55arlcNpM2umXoQsRlmCEw1kYXQ/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Give Feedback
        </a>
      </div>
    </div>
  );
}
