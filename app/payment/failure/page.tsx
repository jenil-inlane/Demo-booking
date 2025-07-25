"use client";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId") ?? "";
  
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
      <p className="mb-2">
        Transaction ID: <span className="font-mono">{transactionId}</span>
      </p>
      <p className="mb-4 text-red-500">Your payment could not be processed.</p>
      <p>
        Please try again or contact support if the issue persists.<br />
        <span className="font-semibold">Support:</span>{" "}
        <a href="tel:9971708152" className="text-blue-600 underline">9971708152</a>
      </p>
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
