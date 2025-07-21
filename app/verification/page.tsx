"use client";
import { use, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function VerificationPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [phoneOtp, setPhoneOtp] = useState("");
  const [otpSent, setOtpSent] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [error, setError] = useState("");

  // Extract form data from query params
  const name = params.get("name") || "";
  const phone = params.get("phone") || "";
  const email = params.get("email") || "";
  const custom_area = params.get("custom_area") || "";
  const has_license = params.get("has_license") || "";
  const AMOUNT = 600;

  // Simulate sending OTP (replace with real API)
  const sendOtp = async () => {
    setError("");
    const { data, error } = await supabase.functions.invoke("send-message", {
      body: {
        message_type: "PHONE_VERIFICATION_OTP",
        phone: phone,
      },
    });
    if (error) {
      setError("Failed to send OTP. Please try again.");
      return;
    }
    if (data) {
      console.log("OTP sent successfully:", data);
      alert(`OTP sent to ${phone}`);
      const otp = data.result.messagePayload.messages[0].variables
        .find((v: { type: string }) => v.type === "body")
        ?.parameters.find(
          (p: { type: string; text: string }) => p.type === "text"
        )?.text;
      setOtpSent(otp);
    }
  };

  // Simulate verifying OTP (replace with real API)
  const verifyOtp = async () => {
    setError("");
    if (otpSent !== "" && phoneOtp === otpSent) {
      setPhoneVerified(true);
      console;
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  async function redirectToPaymentGateway() {
    try {
      const { data, error } = await supabase.functions.invoke(
        "demo-page-payment",
        {
          body: {
            name: name,
            phone: phone,
            email: email,
            customerArea: custom_area,
            hasDrivingLicense: has_license,
            amount: AMOUNT,
          },
        }
      );

      if (error) {
        setError("Failed to create payment link. Please try again.");
        return;
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.gatewayURL;

      // Add debug logging
      console.log("Submitting to payment gateway:", {
        gatewayURL: data.gatewayURL,
        formData: data.formData,
      });

      // Ensure all form fields are properly set
      Object.entries(data.formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
        console.log(`Added form field: ${key}=${value}`);
      });

      // Set form attributes for proper submission
      form.setAttribute("target", "_self");
      form.style.display = "none";

      // Append form to body, submit it, and then remove it
      document.body.appendChild(form);

      // Add a small delay before submitting the form
      setTimeout(() => {
        console.log("Submitting payment form...");
        form.submit();
        // Don't remove the form immediately to ensure it submits properly
        setTimeout(() => {
          if (document.body.contains(form)) {
            document.body.removeChild(form);
          }
        }, 2000);
      }, 100);
    } catch (error) {
      console.error("Error redirecting to payment gateway:", error);
      setError(
        "An error occurred while redirecting to the payment gateway. Please try again."
      );
    }
  }

  const handleProceed = () => {
    redirectToPaymentGateway();
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Phone OTP Verification</h2>
      <div className="mb-6">
        <div>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          {!phoneVerified ? (
            <>
              <button
                onClick={sendOtp}
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
              >
                Send OTP on WhatsApp
              </button>
              <input
                type="text"
                placeholder="Enter Phone OTP"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                className="border px-2 py-1 rounded mr-2"
              />
              <button
                onClick={verifyOtp}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Verify
              </button>
            </>
          ) : (
            <span className="text-green-600 ml-2">Verified ✔️</span>
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <button
        disabled={!phoneVerified}
        onClick={handleProceed}
        className={`w-full px-4 py-2 rounded ${
          phoneVerified
            ? "bg-[#00c281] text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
