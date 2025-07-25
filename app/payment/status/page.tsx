"use client";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

// Function to update the payment status and message in the database with the transaction ID
async function updateToTheDatabase(transactionId: string, success: boolean, message: string) {
  try {
    const { data, error } = await supabase
      .from("demo-payments")
      .update({ paymentStatus: success ? "done" : "failed", paymentMessage: message })
      .eq("id", transactionId);

    if (error) {
      console.error("Error updating payment status:", error);
    } 
    if (data) {
      console.log("Payment status updated successfully:", data);
    }
  } catch (error) {
    console.error("Unexpected error while updating payment status:", error);
  }
} 

async function verifyPaymentStatus(
  paymentResponse: string,
  router: ReturnType<typeof useRouter>
) {
  try {
    const paymentResponseData = JSON.parse(paymentResponse);
    const encData = paymentResponseData.EncData;
    if (!encData) {
      console.error("No EncData found in payment status");
      return;
    }
    console.log("Verifying payment with EncData:", encData);
    // Call the Supabase function to verify payment
    const body = {
      EncData: encData,
    };
    console.log("Verifying payment with body:", body);
    const { data, error } = await supabase.functions.invoke("verify-payment", {
      body: body,
    });
    if (error) {
      console.error("Error verifying payment:", error);
      return;
    }
    if (data) {
      console.log("Payment verification response:", data);
      if (data.ResponseCode == "00") {
        updateToTheDatabase(data.TransactionId, true, data.ResponseMessage??"");
        console.log("Payment successful");
        // redirect to success page
        router.push(`/payment/success?transactionId=${data.TransactionId}`);
      } else {
        updateToTheDatabase(data.TransactionId, false, data.ResponseMessage??"");
        console.log("Payment failed");
        // redirect to failure page
        router.push(`/payment/failure?transactionId=${data.TransactionId}`);
      }
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentResponse = searchParams.get("paymentResponse");
  console.log(paymentResponse);

  useEffect(() => {
    if (paymentResponse) {
      verifyPaymentStatus(paymentResponse, router);
    }
  }, [paymentResponse, router]);

  return null;
}
